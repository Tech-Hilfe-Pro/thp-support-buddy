/* Cloudflare Pages Function para verificar variables de entorno críticas */

const REQUIRED = [
  "VITE_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_SECRET_KEY", 
  "STRIPE_WEBHOOK_SECRET",
  "SITE_URL",
  "PRICE_PRIVAT_S","PRICE_PRIVAT_M","PRICE_PRIVAT_L",
  "PRICE_KMU_STARTER","PRICE_KMU_GROW","PRICE_KMU_PRO",
];

export const onRequestGet: PagesFunction = async (context) => {
  const missing = REQUIRED.filter(k => !context.env[k] || String(context.env[k]).trim() === "");
  
  if (missing.length) {
    const body = {
      ok: false,
      error: "Fehlende ENV-Variablen",
      missing: missing,
      message: `❌ Fehlende ENV: ${missing.join(", ")}`
    };
    return new Response(JSON.stringify(body), { 
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
  
  const body = {
    ok: true,
    message: "✅ ENV ok",
    checked: REQUIRED.length,
    timestamp: new Date().toISOString()
  };
  
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
};