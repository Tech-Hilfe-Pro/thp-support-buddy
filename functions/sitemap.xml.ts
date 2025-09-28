export const onRequestGet: PagesFunction = async (ctx) => {
  const SITE_URL = ctx.env?.SITE_URL || "https://example.com";
  const urls = [
    "/", "/leistungen", "/pakete-preise", "/termin", "/ueber-uns", "/kontakt",
    "/recht/impressum", "/recht/datenschutz", "/recht/agb", "/recht/widerruf"
  ];
  const lastmod = new Date().toISOString();
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map(u => `<url><loc>${SITE_URL}${u}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.6"}</priority></url>`).join("") +
    `</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};