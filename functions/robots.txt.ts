export const onRequestGet: PagesFunction = async (ctx) => {
  const site = (ctx.env as any)?.SITE_URL || "https://www.techhilfepro.de";
  const body = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${site.replace(/\/$/, "")}/sitemap.xml`
  ].join("\n") + "\n";
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400"
    }
  });
};