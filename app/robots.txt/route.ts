import { business } from "../site-data";

export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${business.siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
