/**
 * POST /api/stripe/webhook
 * Webhook para eventos de Stripe
 * Verifica firma y actualiza estado de suscripciones
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@18.5.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY no configurada');
    }

    if (!webhookSecret) {
      console.warn('STRIPE_WEBHOOK_SECRET no configurada. No se verificará la firma.');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2025-08-27.basil',
    });

    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event: Stripe.Event;

    // Verificar firma si el webhook secret está configurado
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        console.error('Error verificando firma webhook:', err);
        return new Response(
          JSON.stringify({ error: 'Firma webhook inválida' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    } else {
      // Sin verificación de firma (solo desarrollo)
      event = JSON.parse(body);
    }

    // Procesar eventos relevantes
    console.log(`[Webhook] Evento recibido: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('[Webhook] Checkout completado:', {
          sessionId: session.id,
          customer: session.customer,
          subscription: session.subscription,
          metadata: session.metadata,
        });

        // AQUÍ: Actualizar base de datos local con estado de suscripción
        // Por ahora solo logging
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('[Webhook] Suscripción actualizada:', {
          subscriptionId: subscription.id,
          customer: subscription.customer,
          status: subscription.status,
          metadata: subscription.metadata,
        });

        // AQUÍ: Actualizar estado en base de datos
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('[Webhook] Suscripción cancelada:', {
          subscriptionId: subscription.id,
          customer: subscription.customer,
        });

        // AQUÍ: Marcar suscripción como inactiva
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('[Webhook] Pago exitoso:', {
          invoiceId: invoice.id,
          customer: invoice.customer,
          amount: invoice.amount_paid,
          subscription: invoice.subscription,
        });
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('[Webhook] Pago fallido:', {
          invoiceId: invoice.id,
          customer: invoice.customer,
          subscription: invoice.subscription,
        });
        break;
      }

      default:
        console.log(`[Webhook] Evento no manejado: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
