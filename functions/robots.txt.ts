export const onRequestGet: PagesFunction = async (ctx) => {
  const SITE_URL = ctx.env?.SITE_URL || "https://example.com";
  const body =
`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};