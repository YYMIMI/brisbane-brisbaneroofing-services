import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Execute the real API code in a local sandbox: every provider request is mocked.
test("Gold Coast area routes to the existing recipient with clear city and roof-leak context", async () => {
  const source = readFileSync(new URL("../app/api/enquiry/route.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {}, deliveries = [];
  vm.runInNewContext(compiled, {
    exports, require: () => ({ business: { phone: "LOCAL", email: "local@example.invalid" } }),
    Request, Response, TextEncoder, URL, crypto, AbortSignal, console,
    process: { env: { VERCEL_ENV: "production", RESEND_API_KEY: "LOCAL MOCK", CONTACT_FROM_EMAIL: "sender@example.invalid", CONTACT_TO_EMAIL: "existing-recipient@example.invalid" } },
    fetch: async (url, options) => { assert.equal(url, "https://api.resend.com/emails"); deliveries.push({ payload: JSON.parse(options.body), headers: options.headers }); return new Response("{}", { status: 200 }); },
  });
  const host = "www.melonebrisbaneroofing.com.au";
  const submit = enquiryArea => exports.POST(new Request(`https://${host}/api/enquiry`, { method: "POST", headers: { host, origin: `https://${host}`, "content-type": "application/json" }, body: JSON.stringify({ name: "LOCAL TEST", suburb: "LOCAL SUBURB", urgency: "Leak appears when it rains", issue: "LOCAL roof leak observations", contact: "local@example.invalid", leadId: "local-test-0001", enquiryArea }) }));
  for (const area of ["gold-coast", undefined, "gold-coast\nInjected", { city: "gold-coast" }]) assert.equal((await submit(area)).status, 201);
  assert.equal(deliveries.length, 4);
  assert.match(deliveries[0].payload.subject, /^New Gold Coast roofing enquiry/);
  assert.match(deliveries[0].payload.text, /Service: Gold Coast roof leak enquiry/);
  assert.match(deliveries[0].payload.text, /Suburb: LOCAL SUBURB/);
  for (const delivery of deliveries) {
    assert.deepEqual(delivery.payload.to, ["existing-recipient@example.invalid"]);
    assert.equal(delivery.headers["Idempotency-Key"], "brisbane-roofing/local-test-0001");
  }
  for (const delivery of deliveries.slice(1)) {
    assert.equal(delivery.payload.subject, "New Brisbane roofing enquiry — LOCAL SUBURB");
    assert.doesNotMatch(delivery.payload.text, /Service: Gold Coast/);
  }
});
