export const onRequestGet: PagesFunction = async (ctx) => {
  const body = {
    ok: true,
    project: "Tech Hilfe Pro",
    version: (await import("../../src/version.ts")).APP_VERSION || "0.0.0",
    time: new Date().toISOString(),
    site: ctx.env?.SITE_URL || "unset"
  };
  return new Response(JSON.stringify(body), { headers: { "Content-Type":"application/json; charset=utf-8" }});
};