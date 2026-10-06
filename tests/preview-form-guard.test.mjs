import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

async function loadHandler() {
  const source = readFileSync(new URL("../app/api/enquiry/route.ts", import.meta.url), "utf8")
    .replace('import { business } from "../../site-data";', 'const business = { email: "test@example.com", phone: "0400 000 000" };');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
  return (await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`)).POST;
}

function request(host) {
  return new Request(`https://${host}/api/enquiry`, {
    method: "POST",
    headers: { host, origin: `https://${host}`, "content-type": "application/json" },
    body: JSON.stringify({ name: "Test", suburb: "Brisbane", urgency: "Routine", issue: "A test roofing repair request.", contact: "0400000000" }),
  });
}

test("preview and non-formal hosts cannot send roofing enquiry email", async () => {
  const originalEnv = process.env.VERCEL_ENV;
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalTo = process.env.CONTACT_TO_EMAIL;
  const originalFrom = process.env.CONTACT_FROM_EMAIL;
  let providerCalls = 0;
  globalThis.fetch = async () => { providerCalls++; return new Response("{}", { status: 200 }); };
  process.env.RESEND_API_KEY = "mock-key";
  process.env.CONTACT_TO_EMAIL = "team@example.com";
  process.env.CONTACT_FROM_EMAIL = "website@example.com";
  try {
    const post = await loadHandler();
    for (const [environment, host] of [
      ["preview", "www.melonebrisbaneroofing.com.au"],
      [undefined, "www.melonebrisbaneroofing.com.au"],
      ["production", "brisbane-brisbaneroofing-services-git-branch.vercel.app"],
      ["production", ""],
    ]) {
      if (environment === undefined) delete process.env.VERCEL_ENV;
      else process.env.VERCEL_ENV = environment;
      const probe = request(host || "invalid.example");
      if (!host) probe.headers.delete("host");
      const response = await post(probe);
      assert.equal(response.status, 403, `${environment} / ${host}`);
      assert.equal(providerCalls, 0, "provider called from non-production route");
    }
    process.env.VERCEL_ENV = "production";
    for (const host of ["www.melonebrisbaneroofing.com.au", "melonebrisbaneroofing.com.au"]) {
      const response = await post(request(host));
      assert.equal(response.status, 201, `formal ${host}`);
      assert.equal((await response.json()).delivered, true);
    }
    assert.equal(providerCalls, 2);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of [["VERCEL_ENV", originalEnv], ["RESEND_API_KEY", originalKey], ["CONTACT_TO_EMAIL", originalTo], ["CONTACT_FROM_EMAIL", originalFrom]]) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
