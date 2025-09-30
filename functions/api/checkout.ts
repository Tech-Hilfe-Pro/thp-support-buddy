/**
 * POST /api/checkout
 * Endpoint para crear sesión de Stripe Checkout
 * Soporta planes KMU y Privat
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@18.5.0';
import { CheckoutRequest } from '../lib/pricing/types.ts';
import { getKMUPlanById, getPrivatPlanById } from '../lib/pricing/plans.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Mapeo de plan IDs a Stripe Price IDs
// NOTA: Estos deben configurarse en variables de entorno o aquí según los price IDs reales de Stripe
const STRIPE_PRICE_MAP: Record<string, string> = {
  'kmu-basic': Deno.env.get('STRIPE_PRICE_KMU_BASIC') || 'price_kmu_basic_placeholder',
  'kmu-standard': Deno.env.get('STRIPE_PRICE_KMU_STANDARD') || 'price_kmu_standard_placeholder',
  'kmu-premium': Deno.env.get('STRIPE_PRICE_KMU_PREMIUM') || 'price_kmu_premium_placeholder',
  'privat-start': Deno.env.get('STRIPE_PRICE_PRIVAT_START') || 'price_privat_start_placeholder',
  'privat-plus': Deno.env.get('STRIPE_PRICE_PRIVAT_PLUS') || 'price_privat_plus_placeholder',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Parse request body
    const body: CheckoutRequest = await req.json();
    const { planType, planId, qty, companyName, email } = body;

    // Validate required fields
    if (!planType || !planId || !email) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos requeridos: planType, planId, email' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate plan exists
    let plan;
    let metadata: Record<string, string> = {};

    if (planType === 'kmu') {
      plan = getKMUPlanById(planId);
      if (!plan) {
        return new Response(JSON.stringify({ error: 'Plan KMU no encontrado' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Para KMU, qty es el número de endpoints
      const endpoints = qty || 1;
      metadata = {
        planType: 'kmu',
        planId,
        endpoints: endpoints.toString(),
        minMonthly: plan.minMonthly.toString(),
        companyName: companyName || '',
      };
    } else if (planType === 'privat') {
      plan = getPrivatPlanById(planId);
      if (!plan) {
        return new Response(JSON.stringify({ error: 'Plan Privat no encontrado' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      metadata = {
        planType: 'privat',
        planId,
      };
    } else {
      return new Response(
        JSON.stringify({ error: 'planType inválido. Debe ser "kmu" o "privat"' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get Stripe price ID
    const stripePriceId = STRIPE_PRICE_MAP[planId];
    if (!stripePriceId || stripePriceId.includes('placeholder')) {
      return new Response(
        JSON.stringify({
          error: 'Stripe Price ID no configurado para este plan. Configure las variables de entorno.',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      return new Response(
        JSON.stringify({ error: 'Stripe no está configurado' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2025-08-27.basil',
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId = customers.data.length > 0 ? customers.data[0].id : undefined;

    // Get app URL from environment or request origin
    const appUrl = Deno.env.get('APP_URL') || req.headers.get('origin') || 'http://localhost:8080';

    // Create checkout session
    const quantity = planType === 'kmu' ? (qty || 1) : 1;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price: stripePriceId,
          quantity,
        },
      ],
      mode: 'subscription',
      success_url: `${appUrl}/kasse/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/kasse/fehler`,
      metadata,
      subscription_data: {
        metadata,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in /api/checkout:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return new Response(
      JSON.stringify({ error: `Error al crear sesión de checkout: ${errorMessage}` }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
