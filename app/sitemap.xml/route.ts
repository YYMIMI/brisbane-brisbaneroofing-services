import { business, lastContentUpdate, services } from "../site-data";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const paths = [
    "/",
    "/services",
    ...services.map((service) => service.path),
    "/roof-types",
    "/service-areas",
    "/projects",
    "/about",
    "/contact",
    "/privacy",
  ];
  const urls = paths
    .map(
      (path) => `
  <url>
    <loc>${escapeXml(`${business.siteUrl}${path}`)}</loc>
    <lastmod>${lastContentUpdate}</lastmod>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path === "/services" ? "0.9" : "0.8"}</priority>
  </url>`,
    )
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
