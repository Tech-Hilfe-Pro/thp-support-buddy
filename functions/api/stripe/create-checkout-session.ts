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
    const { amountCents, description, customerEmail, successUrl, cancelUrl } = body;

    // Validation
    if (!amountCents || amountCents <= 0) {
      return new Response(JSON.stringify({ error: 'Ungültiger Betrag' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get origin for URLs
    const origin = new URL(request.url).origin;
    const finalSuccessUrl = successUrl || `${origin}/termin/bestaetigt`;
    const finalCancelUrl = cancelUrl || `${origin}/kasse?mode=one_time`;

    // Create Checkout Session
    const sessionData: Record<string, any> = {
      mode: 'payment',
      'line_items[0][price_data][currency]': 'eur',
      'line_items[0][price_data][product_data][name]': description || 'Tech Hilfe Pro – Vor-Ort-Service',
      'line_items[0][price_data][unit_amount]': amountCents,
      'line_items[0][quantity]': 1,
      allow_promotion_codes: 'false',
      'payment_method_types[]': ['card', 'sepa_debit'],
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl
    };

    if (customerEmail) {
      sessionData.customer_email = customerEmail;
    }

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formEncode(sessionData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Stripe Checkout Session Error:', errorText);
      return new Response(JSON.stringify({ error: 'Checkout Session konnte nicht erstellt werden' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const session = await response.json();

    return new Response(JSON.stringify({ 
      url: session.url 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Checkout Session Error:', error);
    return new Response(JSON.stringify({ error: 'Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}