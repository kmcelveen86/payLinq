'use client';

import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_PUBLISHABLE_STRIPE_API_KEY_SANDBOX;
    
    if (!publishableKey) {
      console.error('NEXT_PUBLIC_PUBLISHABLE_STRIPE_API_KEY_SANDBOX is not set');
      return Promise.resolve(null);
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
};

export default getStripe;
