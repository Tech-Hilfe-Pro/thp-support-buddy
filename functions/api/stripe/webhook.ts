function parseSigHeader(sig: string) {
  // Format: t=timestamp,v1=signature
  const parts = sig.split(",").map(s => s.trim());
  const out: Record<string,string> = {};
  for (const p of parts) { const [k,v] = p.split("="); if (k && v) out[k] = v; }
  return { t: out["t"], v1: out["v1"] };
}
async function hmacSHA256(key: string, msg: string) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
  return Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2,"0")).join("");
}
export const onRequestPost: PagesFunction = async (ctx) => {
  const secret = ctx.env?.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("missing secret", { status: 500 });
  const sig = ctx.request.headers.get("stripe-signature") || "";
  const { t, v1 } = parseSigHeader(sig);
  if (!t || !v1) return new Response("bad signature header", { status: 400 });

  // RAW body lesen
  const raw = await ctx.request.arrayBuffer();
  const payload = new TextDecoder().decode(raw);
  const signedPayload = `${t}.${payload}`;
  const computed = await hmacSHA256(secret, signedPayload);
  const safeEqual = (a: string, b: string) => {
    if (a.length !== b.length) return false;
    let res = 0; for (let i = 0; i < a.length; i++) res |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return res === 0;
  };
  if (!safeEqual(computed, v1)) return new Response("invalid signature", { status: 400 });

  // Ereignis nur grob prüfen und loggen
  let event: any;
  try { event = JSON.parse(payload); } catch { return new Response("bad json", { status: 400 }); }
  const okTypes = new Set(["payment_intent.succeeded","invoice.paid","customer.subscription.created","customer.subscription.updated"]);
  if (event?.type && okTypes.has(event.type)) {
    console.log("STRIPE WEBHOOK OK:", event.type);
  } else {
    console.log("STRIPE WEBHOOK IGNORED:", event?.type);
  }
  return new Response(JSON.stringify({ received: true }), { headers: { "Content-Type":"application/json" } });
};