/* Node/TS optional – hier plain TS, über ts-node od. esbuild laufen lassen.
   Prüft, ob alle kritischen ENV gesetzt sind (bei Cloudflare lokal via .env, im Dashboard via Vars). */
const REQUIRED = [
  "VITE_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "SITE_URL",
  "PRICE_PRIVAT_S","PRICE_PRIVAT_M","PRICE_PRIVAT_L",
  "PRICE_KMU_STARTER","PRICE_KMU_GROW","PRICE_KMU_PRO",
];

function checkEnv() {
  const missing = REQUIRED.filter(k => !process.env[k] || String(process.env[k]).trim() === "");
  if (missing.length) {
    console.error("❌ Fehlende ENV:", missing.join(", "));
    process.exit(1);
  }
  console.log("✅ ENV ok");
}

checkEnv();