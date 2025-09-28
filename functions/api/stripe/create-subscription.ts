import Stripe from "stripe";

export const onRequestPost: PagesFunction = async (ctx) => {
  const secret = (ctx.env as any).STRIPE_SECRET_KEY;
  const price = (ctx.env as any).STRIPE_PRICE_ABO_BASIC;
  if (!secret || !price) return new Response(JSON.stringify({ error: "missing key/price" }), { status: 500 });
  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  const body = await ctx.request.json().catch(()=>({}));
  const email = String(body.email || "");
  if (!email) return new Response(JSON.stringify({ error: "email required" }), { status: 400 });

  try {
    const customer = await stripe.customers.create({ email }, { idempotencyKey: crypto.randomUUID() });
    const sub = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"]
    }, { idempotencyKey: crypto.randomUUID() });

    const pi = (sub.latest_invoice as any)?.payment_intent;
    return new Response(JSON.stringify({ clientSecret: pi?.client_secret, subscriptionId: sub.id, customerId: customer.id }),
      { headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  } catch (e:any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};