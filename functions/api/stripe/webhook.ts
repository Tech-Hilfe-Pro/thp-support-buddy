import Stripe from "stripe";

export const onRequestPost: PagesFunction = async (ctx) => {
  const secret = (ctx.env as any).STRIPE_SECRET_KEY;
  const whsec = (ctx.env as any).STRIPE_WEBHOOK_SECRET;
  if (!secret || !whsec) return new Response("missing secrets", { status: 500 });

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });
  const payload = await ctx.request.arrayBuffer();
  const sig = ctx.request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    const cryptoProvider = Stripe.createSubtleCryptoProvider();
    event = await stripe.webhooks.constructEventAsync(payload, sig, whsec, undefined, cryptoProvider);
  } catch (err:any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.processing":
      case "payment_intent.succeeded":
      case "payment_intent.payment_failed":
      case "invoice.paid":
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        // TODO: aquí sincronizar tu estado de pedido/suscripción
        break;
      default:
        // ignorar otros eventos
        break;
    }
    return new Response("OK");
  } catch (e:any) {
    return new Response(`Processing Error: ${e.message}`, { status: 500 });
  }
};