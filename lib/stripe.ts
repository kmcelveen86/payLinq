import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY_SANDBOX) {
  throw new Error('STRIPE_SECRET_KEY_SANDBOX is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_SANDBOX, {
  apiVersion: '2026-01-28.clover',
  typescript: true,
});

export const STRIPE_PRICES = {
  WHITE: {
    MONTHLY: process.env.STRIPE_PRICE_WHITE_MONTHLY!,
    YEARLY: process.env.STRIPE_PRICE_WHITE_YEARLY!,
  },
  SILVER: {
    MONTHLY: process.env.STRIPE_PRICE_SILVER_MONTHLY!,
    YEARLY: process.env.STRIPE_PRICE_SILVER_YEARLY!,
  },
  GOLD: {
    MONTHLY: process.env.STRIPE_PRICE_GOLD_MONTHLY!,
    YEARLY: process.env.STRIPE_PRICE_GOLD_YEARLY!,
  },
  BLACK: {
    MONTHLY: process.env.STRIPE_PRICE_BLACK_MONTHLY!,
    YEARLY: process.env.STRIPE_PRICE_BLACK_YEARLY!,
  },
};

// Validate that all prices are present
Object.entries(STRIPE_PRICES).forEach(([tier, prices]) => {
  Object.entries(prices).forEach(([cycle, priceId]) => {
    if (!priceId) {
      throw new Error(`Missing Stripe price ID for ${tier} ${cycle}`);
    }
  });
});

export const STRIPE_FAILURE_MESSAGES: Record<string, string> = {
  insufficient_funds: "Your card has insufficient funds. Please use a different card or contact your bank.",
  lost_card: "This card has been reported lost. Please use a different card.",
  stolen_card: "This card has been reported stolen. Please use a different card.",
  expired_card: "This card has expired. Please use a valid card.",
  incorrect_cvc: "The security code (CVC) is incorrect. Please check and try again.",
  processing_error: "An error occurred while processing your card. Please try again later.",
  incorrect_number: "The card number is incorrect. Please check and try again.",
  card_declined: "Your card was declined. Please check your information or try a different card.",
  authentication_required: "Authentication is required. Please verify this payment with your bank.",
};

export function getFriendlyStripeError(errorOrCode: any): string {
  if (!errorOrCode) return "An unknown error occurred with your payment.";

  const code = typeof errorOrCode === 'string'
    ? errorOrCode
    : errorOrCode.decline_code || errorOrCode.code;

  if (code && STRIPE_FAILURE_MESSAGES[code]) {
    return STRIPE_FAILURE_MESSAGES[code];
  }

  // Fallback for unmapped codes but with a decent default if it's a generic decline
  if (code === 'generic_decline') {
    return STRIPE_FAILURE_MESSAGES.card_declined;
  }

  return "Payment failed. Please check your payment details and try again.";
}

export default stripe;
