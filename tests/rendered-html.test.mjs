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
    assert.match(html, /reply within 24 hours/i);
  }
});


test("renders reciprocal English and Chinese roof repair Owners without changing restoration", async () => {
  const worker = await loadWorker("bilingual-repair-owner");

  const homeResponse = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    workerEnv(),
    executionContext,
  );
  assert.equal(homeResponse.status, 200);
  const homeHtml = await homeResponse.text();
  assert.match(
    homeHtml,
    /<link(?=[^>]*\brel=["']alternate["'])(?=[^>]*\bhreflang=["']zh-Hans-AU["'])(?=[^>]*\bhref=["']https:\/\/www\.melonebrisbaneroofing\.com\.au\/zh\/brisbane-roof-repairs["'])[^>]*>/i,
  );
  assert.match(homeHtml, /href=["']\/zh\/brisbane-roof-repairs["']/i);

  const chineseResponse = await worker.fetch(
    new Request("http://localhost/zh/brisbane-roof-repairs", {
      headers: { accept: "text/html" },
    }),
    workerEnv(),
    executionContext,
  );
  assert.equal(chineseResponse.status, 200);
  const chineseHtml = await chineseResponse.text();
  const chineseH1s = [
    ...chineseHtml.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi),
  ];
  assert.equal(chineseH1s.length, 1);
  assert.equal(htmlText(chineseH1s[0][1]), "布里斯班屋顶维修中文服务");
  assert.match(
    chineseHtml,
    /<title[^>]*>布里斯班屋顶维修中文服务 \| 漏水、瓦片与金属屋顶<\/title>/i,
  );
  assert.match(
    chineseHtml,
    /<link(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']https:\/\/www\.melonebrisbaneroofing\.com\.au\/zh\/brisbane-roof-repairs["'])[^>]*>/i,
  );
  assert.match(
    chineseHtml,
    /<link(?=[^>]*\brel=["']alternate["'])(?=[^>]*\bhreflang=["']en-AU["'])(?=[^>]*\bhref=["']https:\/\/www\.melonebrisbaneroofing\.com\.au\/["'])[^>]*>/i,
  );
  assert.match(chineseHtml, /href=["']\/services\/roof-leak-repairs-brisbane["']/i);
  assert.match(chineseHtml, /href=["']\/services\/tile-roof-repairs-brisbane["']/i);
  assert.match(chineseHtml, /href=["']\/services\/metal-roof-repairs-brisbane["']/i);
  assert.match(chineseHtml, /href=["']\/services\/roof-restoration-brisbane["']/i);

  const restorationResponse = await worker.fetch(
    new Request("http://localhost/zh/brisbane-roof-restoration", {
      headers: { accept: "text/html" },
    }),
    workerEnv(),
    executionContext,
  );
  assert.equal(restorationResponse.status, 200);
  const restorationHtml = await restorationResponse.text();
  assert.match(
    restorationHtml,
    /<title[^>]*>布里斯班屋顶翻新中文服务 \| 瓦屋顶检查与修复<\/title>/i,
  );
  assert.match(
    restorationHtml,
    /<link(?=[^>]*\bhreflang=["']en-AU["'])(?=[^>]*\bhref=["']https:\/\/www\.melonebrisbaneroofing\.com\.au\/services\/roof-restoration-brisbane["'])[^>]*>/i,
  );
});
