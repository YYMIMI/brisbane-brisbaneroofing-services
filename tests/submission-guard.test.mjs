import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Execute the actual TSX handler. Every external request, analytics event and
// navigation is intercepted locally; no provider, database or GA writes occur.
const sourceUrl = new URL("../app/contact/request-builder.tsx", import.meta.url);
const jsx = { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
const identity = { phoneDisplay: "0000000000", phoneHref: "tel:0000000000", phone: "0000000000", email: "local@example.invalid", brand: "LOCAL TEST" };
const attribution = { hostname: "www.melonebrisbaneroofing.com.au", landing_page: "/contact", source: "direct", medium: "none" };

function formIn(tree) {
  if (!tree || typeof tree !== "object") return null;
  if (tree.type === "form") return tree;
  for (const child of [tree.props?.children].flat(Infinity)) {
    const found = formIn(child);
    if (found) return found;
  }
  return null;
}

async function harness({ failure = null, navigationFails = false, honeypot = false, analyticsFailure = null, setupFailure = false, firstEnvelope = undefined, hangFirst = false, apiResponder = null, initialValues = {} } = {}) {
  const requests = [], events = [], states = [], navigations = [], pending = [], timers = [];
  let resets = 0, analyticsThrown = false, setupThrown = false;
  const recordEvent = (name, data) => { events.push([name, data]); if (analyticsFailure === name && !analyticsThrown) { analyticsThrown = true; throw new Error("LOCAL ANALYTICS FAILURE"); } };
  const source = await readFile(sourceUrl, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2022, esModuleInterop: true,
  } }).outputText;
  const modules = {
    react: { useRef: value => ({ current: value }), useEffect() {}, useState: initial => {
      let value = typeof initial === "function" ? initial() : initial;
      if (value && typeof value === "object" && !Array.isArray(value)) value = { ...value, ...initialValues };
      return [value, next => { value = typeof next === "function" ? next(value) : next; states.push(value); }];
    } },
    "react/jsx-runtime": jsx,
    "next/link": () => null,
    "lucide-react": { ArrowRight: () => null },
    "../site-data": { business: identity }, "../google-analytics": { getLeadAttribution: () => attribution },
  };
  class LocalFormData extends FormData {
    constructor() {
      super();
      if (setupFailure && !setupThrown) { setupThrown = true; throw new Error("LOCAL FORM SETUP FAILURE"); }
      for (const [name, value] of Object.entries({ name: "LOCAL TEST ONLY", phone: "0000000000", email: "local@example.invalid", suburb: "LOCAL", service: "LOCAL SERVICE", details: "LOCAL TEST ONLY retained details", consent: "yes", website: honeypot ? "local honeypot" : "", ...initialValues })) this.set(name, value);
    }
  }
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: name => { assert.ok(name in modules, `Unexpected import ${name}`); return modules[name]; },
    FormData: LocalFormData, crypto, URLSearchParams, Date, AbortController,
    setTimeout: (callback, delay) => { const timer = { callback, delay }; timers.push(timer); return timer; },
    clearTimeout: timer => { const index = timers.indexOf(timer); if (index >= 0) timers.splice(index, 1); },
    window: { location: { hostname: attribution.hostname, pathname: "/contact", search: "", assign: path => {
      navigations.push(path);
      if (navigationFails) throw new Error("LOCAL NAVIGATION FAILURE");
    } }, gtag: (_, name, data) => recordEvent(name, data) },
    fetch: async (url, options) => {
      assert.equal(url, "/api/enquiry", "only the intercepted local route is permitted");
      assert.equal(options.method, "POST");
      requests.push({ url, payload: JSON.parse(options.body) });
      if (apiResponder) return apiResponder(JSON.parse(options.body), requests.length);
      if (hangFirst && requests.length === 1) {
        assert.ok(options.signal, "the actual request must carry an abort signal");
        return new Promise((_, reject) => options.signal.addEventListener("abort", () => reject(new DOMException("LOCAL DEADLINE EXCEEDED", "AbortError")), { once: true }));
      }
      if (failure && requests.length === 1) {
        if (failure === "network") throw new TypeError("LOCAL OFFLINE FAILURE");
        if (failure === "timeout") throw new DOMException("LOCAL TIMEOUT FAILURE", "TimeoutError");
        return { ok: false, status: 503, json: async () => ({ ok: false, delivered: false, message: "LOCAL API FAILURE", error: "LOCAL API FAILURE" }) };
      }
      await new Promise(resolve => pending.push(resolve));
      return { ok: true, status: 201, json: async () => firstEnvelope !== undefined && requests.length === 1 ? firstEnvelope : ({ ok: true, delivered: !honeypot, message: "LOCAL ACCEPTANCE" }) };
    },
    DOMException,
  });
  const component = exports.default;
  const tree = component({});
  const form = formIn(tree);
  assert.ok(form, "the actual component must render a form");
  const event = { preventDefault() {}, currentTarget: { reset() { resets++; } } };
  return {
    requests, events, states, navigations, timers,
    get resets() { return resets; },
    submit: () => form.props.onSubmit(event),
    release: () => pending.splice(0).forEach(resolve => resolve()),
    latestStatus: () => states.filter(value => typeof value === "string" && ["idle", "submitting", "sending", "success", "error"].includes(value)).at(-1),
  };
}

test("two submissions before React renders send one request", async () => {
  const form = await harness();
  const first = form.submit(), second = form.submit();
  form.release();
  await Promise.all([first, second]);
  assert.equal(form.requests.length, 1);
  assert.equal(form.events.filter(([name]) => name === "lead_submit_attempt").length, 1);
  assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 1);
  assert.deepEqual(form.navigations, ["/thank-you"]);
});

test("accepted request stays guarded while navigation is pending", async () => {
  const form = await harness();
  const first = form.submit(); form.release(); await first;
  const second = form.submit(); form.release(); await second;
  assert.equal(form.requests.length, 1);
  assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 1);
});

test("API failure preserves the payload and permits one retry", async () => {
  const form = await harness({ failure: "http" });
  await form.submit();
  assert.equal(form.latestStatus(), "error");
  assert.equal(form.resets, 0);
  assert.equal(form.navigations.length, 0);
  assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 0);
  const retry = form.submit(); form.release(); await retry;
  assert.equal(form.requests.length, 2);
  assert.deepEqual(form.requests[1].payload, form.requests[0].payload);
  assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 1);
});

for (const failure of ["network", "timeout"]) {
  test(`${failure} failure does not navigate or count as a lead and can retry`, async () => {
    const form = await harness({ failure });
    await form.submit();
    assert.equal(form.latestStatus(), "error");
    assert.equal(form.resets, 0);
    assert.equal(form.navigations.length, 0);
    assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 0);
    const retry = form.submit(); form.release(); await retry;
    assert.equal(form.requests.length, 2);
    assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 1);
  });
}

test("accepted request is not reclassified as API failure when navigation fails", async () => {
  const form = await harness({ navigationFails: true });
  const first = form.submit(); form.release(); await first;
  const second = form.submit(); form.release(); await second;
  assert.equal(form.requests.length, 1);
  assert.equal(form.latestStatus(), "success");
  assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 1);
  assert.equal(form.events.filter(([name]) => name === "lead_api_error").length, 0);
});

test("analytics success payload contains no form personal data", async () => {
  const form = await harness();
  const submission = form.submit(); form.release(); await submission;
  assert.doesNotMatch(JSON.stringify(form.events), /LOCAL TEST ONLY|local@example\.invalid|0000000000/);
});

test("honeypot acceptance does not count as a delivered lead", async () => {
  const form = await harness({ honeypot: true });
  const submission = form.submit(); form.release(); await submission;
  assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 0);
});

test("transient submit analytics failure cannot prevent the enquiry request", async () => {
  const form = await harness({ analyticsFailure: "lead_submit_attempt" });
  const submission = form.submit(); form.release();
  await assert.doesNotReject(submission);
  assert.equal(form.requests.length, 1);
  assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 1);
  assert.deepEqual(form.navigations, ["/thank-you"]);
});

test("accepted enquiry is not retried when success analytics throws", async () => {
  const form = await harness({ analyticsFailure: "generate_lead" });
  const first = form.submit(); form.release(); await first;
  const second = form.submit(); form.release(); await second;
  assert.equal(form.requests.length, 1);
  assert.equal(form.latestStatus(), "success");
  assert.equal(form.events.filter(([name]) => name === "lead_api_error").length, 0);
});

test("transient form setup failure releases the guard for an unchanged retry", async () => {
  const form = await harness({ setupFailure: true });
  await assert.doesNotReject(form.submit());
  assert.equal(form.latestStatus(), "error");
  assert.equal(form.requests.length, 0);
  assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 0);
  const retry = form.submit(); form.release(); await retry;
  assert.equal(form.requests.length, 1);
  assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 1);
});

for (const [label, firstEnvelope] of [["missing delivered", { ok: true }], ["invalid delivered type", { ok: true, delivered: "true" }]]) {
  test(`backend contract rejects HTTP 2xx / ${label} without success or lead`, async () => {
    const form = await harness({ firstEnvelope });
    const first = form.submit(); form.release(); await first;
    assert.equal(form.latestStatus(), "error");
    assert.equal(form.resets, 0); assert.equal(form.navigations.length, 0);
    assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 0);
    const retry = form.submit(); form.release(); await retry;
    assert.equal(form.requests.length, 2);
    assert.equal(form.latestStatus(), "success");
  });
}

test("actual client deadline aborts an unconfirmed request and preserves an unchanged retry", async () => {
  const form = await harness({ hangFirst: true });
  const first = form.submit();
  assert.equal(form.timers.length, 1);
  assert.equal(form.timers[0].delay, 30000);
  form.timers[0].callback(); await first;
  assert.equal(form.latestStatus(), "error");
  assert.equal(form.timers.length, 0);
  assert.equal(form.resets, 0); assert.equal(form.navigations.length, 0);
  assert.equal(form.events.filter(([name]) => name === "generate_lead").length, 0);
  const retry = form.submit(); form.release(); await retry;
  assert.deepEqual(form.requests[1].payload, form.requests[0].payload);
  assert.equal(form.latestStatus(), "success");
  assert.equal(form.timers.length, 0);
});
