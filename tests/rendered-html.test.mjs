import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const ownerRoutes = [
  {
    path: "/services/roof-restoration-brisbane",
    title: "Roof Restoration Brisbane",
    h1: "Tile roof restoration in Brisbane",
  },
  {
    path: "/services/roof-leak-repairs-brisbane",
    title: "Roof Leak Repairs Brisbane",
    h1: "Roof leak repairs in Brisbane",
  },
  {
    path: "/services/tile-roof-repairs-brisbane",
    title: "Tile Roof Repairs Brisbane",
    h1: "Tile roof repairs in Brisbane",
  },
  {
    path: "/services/metal-roof-repairs-brisbane",
    title: "Metal Roof Repairs Brisbane",
    h1: "Metal roof repairs in Brisbane",
  },
];

function htmlText(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

async function loadWorker(testName) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${testName}-${process.pid}-${Date.now()}`,
  );
  return (await import(workerUrl.href)).default;
}

function workerEnv() {
  return {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
}

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

test("renders development preview metadata", async () => {
  const worker = await loadWorker("preview-meta");

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    workerEnv(),
    executionContext,
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});


test("renders distinct primary roofing owner pages", async () => {
  const worker = await loadWorker("owner-pages");

  for (const owner of ownerRoutes) {
    const response = await worker.fetch(
      new Request(`http://localhost${owner.path}`, {
        headers: { accept: "text/html" },
      }),
      workerEnv(),
      executionContext,
    );

    assert.equal(response.status, 200, owner.path);
    const html = await response.text();
    const h1Matches = [
      ...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi),
    ];
    assert.equal(h1Matches.length, 1, `${owner.path} must have one h1`);
    assert.equal(htmlText(h1Matches[0][1]), owner.h1);
    assert.match(html, new RegExp(`<title[^>]*>[^<]*${owner.title}`, "i"));
    assert.match(
      html,
      new RegExp(
        `<link(?=[^>]*\\brel=["']canonical["'])(?=[^>]*\\bhref=["']https://www\\.melonebrisbaneroofing\\.com\\.au${owner.path}["'])[^>]*>`,
        "i",
      ),
    );
    assert.match(html, /href=["']\/contact["']/i);
    assert.match(html, /href=["']tel:\+61451819688["']/i);
  }
});
