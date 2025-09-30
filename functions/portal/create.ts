import Stripe from 'stripe';

interface PortalRequest {
  customerEmail: string;
}

export async function onRequestPost(context: any) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerEmail }: PortalRequest = await context.request.json();

    if (!customerEmail) {
      return new Response(
        JSON.stringify({ error: 'E-Mail-Adresse erforderlich' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    });

    // Find customer by email
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Kein Kunde mit dieser E-Mail-Adresse gefunden' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const customer = customers.data[0];
    const siteUrl = context.env.SITE_URL || 'http://localhost:5173';

    // Create billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${siteUrl}/pakete-preise`,
    });

    return new Response(
      JSON.stringify({ url: portalSession.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Portal creation error:', error);
    return new Response(
      JSON.stringify({ error: 'Fehler beim Erstellen der Portal-Session' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}