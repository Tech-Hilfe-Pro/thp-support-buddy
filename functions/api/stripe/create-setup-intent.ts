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
    const { customerEmail } = body;

    let customerId = '';

    // Find or create customer if email provided
    if (customerEmail) {
      // Search for existing customer
      const searchResponse = await fetch(`https://api.stripe.com/v1/customers?email=${encodeURIComponent(customerEmail)}&limit=1`, {
        headers: {
          'Authorization': `Bearer ${secretKey}`
        }
      });

      if (searchResponse.ok) {
        const searchResult = await searchResponse.json();
        if (searchResult.data && searchResult.data.length > 0) {
          customerId = searchResult.data[0].id;
        } else {
          // Create new customer
          const createResponse = await fetch('https://api.stripe.com/v1/customers', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${secretKey}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formEncode({ email: customerEmail })
          });

          if (createResponse.ok) {
            const customer = await createResponse.json();
            customerId = customer.id;
          }
        }
      }
    }

    // Create SetupIntent
    const setupData: Record<string, any> = {
      'payment_method_types[]': ['sepa_debit', 'card'],
      usage: 'off_session'
    };

    if (customerId) {
      setupData.customer = customerId;
    }

    const response = await fetch('https://api.stripe.com/v1/setup_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formEncode(setupData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Stripe API Error:', errorText);
      return new Response(JSON.stringify({ error: 'SetupIntent konnte nicht erstellt werden' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const setupIntent = await response.json();

    return new Response(JSON.stringify({ 
      client_secret: setupIntent.client_secret,
      customerId: customerId
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Setup Intent Error:', error);
    return new Response(JSON.stringify({ error: 'Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}