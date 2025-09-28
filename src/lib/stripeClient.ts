import { loadStripe, Stripe } from '@stripe/stripe-js';

let _stripeClientPromise: Promise<Stripe | null>;

export function loadStripeClient(): Promise<Stripe | null> {
  if (!_stripeClientPromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      throw new Error('VITE_STRIPE_PUBLISHABLE_KEY ist nicht konfiguriert');
    }
    
    _stripeClientPromise = loadStripe(publishableKey);
  }
  
  return _stripeClientPromise;
}

// Export the promise directly for React Stripe Elements
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);