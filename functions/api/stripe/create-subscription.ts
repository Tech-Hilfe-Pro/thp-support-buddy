import Stripe from "stripe";

export const onRequestPost: PagesFunction = async (ctx) => {
  const stripe = new Stripe((ctx.env as any).STRIPE_SECRET_KEY, { 
    apiVersion: "2024-06-20" 
  });
  
  const body = await ctx.request.json().catch(() => ({}));
  const email = String(body.email || "");
  const priceId = String(body.priceId || "") || (ctx.env as any).STRIPE_PRICE_ABO_BASIC;

  if (!email || !priceId) {
    return new Response(
      JSON.stringify({ error: "email/price missing" }), 
      { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  try {
    const customer = await stripe.customers.create(
      { email }, 
      { idempotencyKey: crypto.randomUUID() }
    );
    
    const sub = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"]
    }, { idempotencyKey: crypto.randomUUID() });

    const pi = (sub.latest_invoice as any)?.payment_intent;
    
    return new Response(
      JSON.stringify({ 
        clientSecret: pi?.client_secret, 
        subscriptionId: sub.id, 
        customerId: customer.id 
      }), 
      {
        headers: { 
          "Content-Type": "application/json", 
          "Cache-Control": "no-store" 
        }
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
};