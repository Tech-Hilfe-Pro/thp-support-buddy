import { formEncode, getPriceIdFromEnv } from './utils';

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
    const { customerEmail, customerId, payment_method, priceId } = body;

    if (!payment_method || !priceId) {
      return new Response(JSON.stringify({ error: 'Payment Method und Price ID sind erforderlich' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let finalCustomerId = customerId;

    // Find or create customer if not provided
    if (!finalCustomerId && customerEmail) {
      // Search for existing customer
      const searchResponse = await fetch(`https://api.stripe.com/v1/customers?email=${encodeURIComponent(customerEmail)}&limit=1`, {
        headers: {
          'Authorization': `Bearer ${secretKey}`
        }
      });

      if (searchResponse.ok) {
        const searchResult = await searchResponse.json();
        if (searchResult.data && searchResult.data.length > 0) {
          finalCustomerId = searchResult.data[0].id;
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
            finalCustomerId = customer.id;
          }
        }
      }
    }

    if (!finalCustomerId) {
      return new Response(JSON.stringify({ error: 'Customer konnte nicht erstellt werden' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get actual price ID from environment
    const actualPriceId = getPriceIdFromEnv(env, priceId);

    // Attach payment method to customer
    const attachResponse = await fetch(`https://api.stripe.com/v1/payment_methods/${payment_method}/attach`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formEncode({ customer: finalCustomerId })
    });

    if (!attachResponse.ok) {
      const errorText = await attachResponse.text();
      console.error('Payment Method Attach Error:', errorText);
      return new Response(JSON.stringify({ error: 'Zahlungsmittel konnte nicht verknüpft werden' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Set default payment method
    const updateCustomerResponse = await fetch(`https://api.stripe.com/v1/customers/${finalCustomerId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formEncode({
        'invoice_settings[default_payment_method]': payment_method
      })
    });

    if (!updateCustomerResponse.ok) {
      console.error('Customer Update Error:', await updateCustomerResponse.text());
    }

    // Create subscription
    const subscriptionData = {
      customer: finalCustomerId,
      'items[0][price]': actualPriceId,
      payment_behavior: 'default_incomplete',
      'expand[]': 'latest_invoice.payment_intent'
    };

    const subscriptionResponse = await fetch('https://api.stripe.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formEncode(subscriptionData)
    });

    if (!subscriptionResponse.ok) {
      const errorText = await subscriptionResponse.text();
      console.error('Subscription Creation Error:', errorText);
      return new Response(JSON.stringify({ error: 'Abonnement konnte nicht erstellt werden' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const subscription = await subscriptionResponse.json();

    return new Response(JSON.stringify({ 
      subscription_id: subscription.id,
      status: subscription.status,
      latest_invoice: subscription.latest_invoice
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Subscription Creation Error:', error);
    return new Response(JSON.stringify({ error: 'Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}