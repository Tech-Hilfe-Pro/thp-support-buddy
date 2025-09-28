import { formEncode } from './utils';

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const secretKey = env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return new Response(JSON.stringify({ error: 'Stripe Secret Key nicht konfiguriert' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { amountCents, description, customerEmail } = body;

    // Validation
    if (!amountCents || amountCents <= 0) {
      return new Response(JSON.stringify({ error: 'Ungültiger Betrag' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create PaymentIntent
    const paymentData: Record<string, any> = {
      amount: amountCents,
      currency: 'eur',
      'automatic_payment_methods[enabled]': 'true'
    };

    if (customerEmail) {
      paymentData.receipt_email = customerEmail;
    }

    if (description) {
      paymentData.description = description;
    }

    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formEncode(paymentData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Stripe API Error:', errorText);
      return new Response(JSON.stringify({ error: 'PaymentIntent konnte nicht erstellt werden' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const paymentIntent = await response.json();

    return new Response(JSON.stringify({ 
      client_secret: paymentIntent.client_secret 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Payment Intent Error:', error);
    return new Response(JSON.stringify({ error: 'Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}