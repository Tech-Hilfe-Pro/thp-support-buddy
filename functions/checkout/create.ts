import Stripe from 'stripe';

// Plan mapping zu Stripe Price IDs
const PLAN_TO_PRICE_ID: Record<string, string> = {
  'privat_s': process.env.PRICE_PRIVAT_S || '',
  'privat_m': process.env.PRICE_PRIVAT_M || '',
  'privat_l': process.env.PRICE_PRIVAT_L || '',
  'kmu_starter': process.env.PRICE_KMU_STARTER || '',
  'kmu_grow': process.env.PRICE_KMU_GROW || '',
  'kmu_pro': process.env.PRICE_KMU_PRO || '',
};

interface CheckoutRequest {
  plan: string;
  customerEmail?: string;
}

export async function onRequestPost(context: any) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { plan, customerEmail }: CheckoutRequest = await context.request.json();

    // Validate plan
    const priceId = PLAN_TO_PRICE_ID[plan];
    if (!priceId) {
      return new Response(
        JSON.stringify({ error: 'Ungültiger Plan ausgewählt' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    });

    const siteUrl = context.env.SITE_URL || 'http://localhost:5173';

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card', 'sepa_debit'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/kasse/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/kasse/abbruch`,
      customer_email: customerEmail,
      allow_promotion_codes: true,
      // Kleinunternehmer (§19 UStG) - keine automatische Steuer
      automatic_tax: { enabled: false },
      locale: 'de',
      metadata: {
        plan: plan,
      },
    });

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Checkout creation error:', error);
    return new Response(
      JSON.stringify({ error: 'Fehler beim Erstellen der Checkout-Session' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}