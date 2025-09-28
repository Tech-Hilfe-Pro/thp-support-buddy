const PUBLIC_ROUTES = [
  "/", "/leistungen", "/pakete-preise", "/kontakt",
  "/recht/impressum", "/recht/datenschutz", "/recht/agb"
];

export const onRequestGet: PagesFunction = async (ctx) => {
  const site = (ctx.env as any)?.SITE_URL || "https://www.techhilfepro.de";
  const today = new Date().toISOString().slice(0,10);
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...PUBLIC_ROUTES.map(u => `<url><loc>${site.replace(/\/$/, "")}${u}</loc><lastmod>${today}</lastmod></url>`),
    `</urlset>`
  ].join("");
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400"
    }
  });
};