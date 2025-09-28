export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
    const allowUnverified = env.ALLOW_UNVERIFIED_WEBHOOKS === 'true';

    // Get raw body
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    // In sandbox mode, we can allow unverified webhooks for testing
    if (!allowUnverified && (!webhookSecret || !sig)) {
      console.error('Missing webhook secret or signature');
      return new Response('Unauthorized', { status: 401 });
    }

    let event;
    try {
      // Parse the event
      event = JSON.parse(body);
      
      // Basic event validation (without full signature verification for sandbox)
      if (!event.type || !event.data) {
        throw new Error('Invalid event format');
      }
    } catch (err) {
      console.error('Webhook parse error:', err);
      return new Response('Invalid payload', { status: 400 });
    }

    // Handle the event
    console.log(`Received webhook: ${event.type}`);

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
        // Here you could update your database, send confirmation emails, etc.
        break;

      case 'invoice.paid':
        const invoice = event.data.object;
        console.log(`Invoice paid: ${invoice.id}`);
        // Handle successful subscription payment
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object;
        console.log(`Subscription created: ${subscription.id}`);
        // Handle new subscription
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object;
        console.log(`Subscription updated: ${updatedSubscription.id}`);
        // Handle subscription changes
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Webhook processing failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}