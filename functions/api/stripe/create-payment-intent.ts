import Stripe from "stripe";

export const onRequestPost: PagesFunction = async (ctx) => {
  const stripe = new Stripe((ctx.env as any).STRIPE_SECRET_KEY, { 
    apiVersion: "2024-06-20" 
  });
  
  const body = await ctx.request.json().catch(() => ({}));
  const amountCents = Math.floor(Number(body.amountCents) || 0);
  const description = String(body.description || "Tech Hilfe Pro – Service");

  // Validación mínima; en producción calcular en servidor desde la cita, no desde el cliente
  if (!(amountCents >= 500 && amountCents <= 500000)) {
    return new Response(
      JSON.stringify({ error: "Invalid amount" }), 
      { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  try {
    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "eur",
      automatic_payment_methods: { enabled: true }, // incluye SEPA y tarjeta
      description,
      metadata: { site: "techhilfepro.de" }
    }, { idempotencyKey: crypto.randomUUID() });

    return new Response(
      JSON.stringify({ clientSecret: intent.client_secret }), 
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