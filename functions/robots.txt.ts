export const onRequestGet: PagesFunction = async (ctx) => {
  const SITE_URL = ctx.env?.SITE_URL || "https://www.techhilfepro.de";
  const body =
`User-agent: *
Allow: /
Disallow: /kasse
Disallow: /techniker
Disallow: /beleg
Disallow: /termin

Sitemap: ${SITE_URL}/sitemap.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};