import Stripe from 'stripe';

export async function onRequestPost(context: any) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    });

    const body = await context.request.text();
    const signature = context.request.headers.get('stripe-signature');

    if (!signature) {
      console.error('Missing Stripe signature');
      return new Response('Missing signature', { status: 400 });
    }

    // Verify webhook signature (nur wenn STRIPE_WEBHOOK_SECRET gesetzt ist)
    let event: Stripe.Event;
    if (context.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        context.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // Fallback für Development - parse ohne Signaturverifikation
      event = JSON.parse(body);
      console.warn('Webhook signature verification skipped (development mode)');
    }

    console.log('Webhook received:', event.type, event.id);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout completed:', {
          sessionId: session.id,
          customerId: session.customer,
          subscriptionId: session.subscription,
          customerEmail: session.customer_email,
          plan: session.metadata?.plan,
        });
        
        // V1: Nur Logging, keine Persistierung
        // V2: Hier würde man den Customer in Supabase speichern
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription created:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
          status: subscription.status,
          priceId: subscription.items.data[0]?.price.id,
        });
        break;

      case 'customer.subscription.updated':
        const updatedSub = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', {
          subscriptionId: updatedSub.id,
          status: updatedSub.status,
          cancelAtPeriodEnd: updatedSub.cancel_at_period_end,
        });
        break;

      case 'customer.subscription.deleted':
        const deletedSub = event.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', {
          subscriptionId: deletedSub.id,
          customerId: deletedSub.customer,
        });
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Payment succeeded:', {
          invoiceId: invoice.id,
          subscriptionId: invoice.subscription,
          amountPaid: invoice.amount_paid,
        });
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log('Payment failed:', {
          invoiceId: failedInvoice.id,
          subscriptionId: failedInvoice.subscription,
          customerId: failedInvoice.customer,
        });
        break;

      default:
        console.log('Unhandled event type:', event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook handling failed' }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}