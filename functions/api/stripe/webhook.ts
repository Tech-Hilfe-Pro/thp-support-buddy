import Stripe from "stripe";

export const onRequestPost: PagesFunction = async (ctx) => {
  const stripe = new Stripe((ctx.env as any).STRIPE_SECRET_KEY, { 
    apiVersion: "2024-06-20" 
  });
  
  const payload = await ctx.request.arrayBuffer();
  const sig = ctx.request.headers.get("stripe-signature") || "";
  const whsec = (ctx.env as any).STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  try {
    const cryptoProvider = Stripe.createSubtleCryptoProvider();
    event = await stripe.webhooks.constructEventAsync(
      payload, 
      sig, 
      whsec, 
      undefined, 
      cryptoProvider
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Log the event for debugging
  console.log(`Received Stripe event: ${event.type}`);

  try {
    switch (event.type) {
      case "payment_intent.processing":
        // SEPA: en proceso; actualizar pedido/CTA
        console.log("Payment processing:", event.data.object.id);
        break;
        
      case "payment_intent.succeeded":
        // Marcar como pagado, enviar email, generar factura si aplica
        console.log("Payment succeeded:", event.data.object.id);
        break;
        
      case "payment_intent.payment_failed":
        // Notificar fallo
        console.log("Payment failed:", event.data.object.id);
        break;
        
      case "invoice.paid":
        // Subscription invoice paid
        console.log("Invoice paid:", event.data.object.id);
        break;
        
      case "customer.subscription.updated":
      case "customer.subscription.created":
      case "customer.subscription.deleted":
        // Sync estado de suscripción
        console.log("Subscription event:", event.type, event.data.object.id);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }
    
    return new Response("OK", { status: 200 });
  } catch (error: any) {
    console.error(`Webhook processing error: ${error.message}`);
    return new Response(`Processing Error: ${error.message}`, { status: 500 });
  }
};