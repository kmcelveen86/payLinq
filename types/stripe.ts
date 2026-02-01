import type Stripe from 'stripe';

// Re-export common Stripe types for convenience
export type {
  Stripe,
};

// Customer types
export type StripeCustomer = Stripe.Customer;
export type StripeCustomerCreateParams = Stripe.CustomerCreateParams;

// Payment Intent types
export type StripePaymentIntent = Stripe.PaymentIntent;
export type StripePaymentIntentCreateParams = Stripe.PaymentIntentCreateParams;

// Payment Method types
export type StripePaymentMethod = Stripe.PaymentMethod;

// Subscription types
export type StripeSubscription = Stripe.Subscription;
export type StripeSubscriptionCreateParams = Stripe.SubscriptionCreateParams;

// Price and Product types
export type StripePrice = Stripe.Price;
export type StripeProduct = Stripe.Product;

// Invoice types
export type StripeInvoice = Stripe.Invoice;

// Card Issuing types (for PayLinq card features)
export type StripeIssuingCard = Stripe.Issuing.Card;
export type StripeIssuingCardCreateParams = Stripe.Issuing.CardCreateParams;
export type StripeIssuingCardholder = Stripe.Issuing.Cardholder;
export type StripeIssuingCardholderCreateParams = Stripe.Issuing.CardholderCreateParams;
export type StripeIssuingTransaction = Stripe.Issuing.Transaction;
export type StripeIssuingAuthorization = Stripe.Issuing.Authorization;

// Webhook types
export type StripeWebhookEvent = Stripe.Event;

// Checkout Session types
export type StripeCheckoutSession = Stripe.Checkout.Session;
export type StripeCheckoutSessionCreateParams = Stripe.Checkout.SessionCreateParams;

// Balance types
export type StripeBalance = Stripe.Balance;
export type StripeBalanceTransaction = Stripe.BalanceTransaction;

// Custom types for PayLinq
export interface PayLinqCardDetails {
  cardId: string;
  cardholderId: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  status: StripeIssuingCard['status'];
}

export interface PayLinqTransactionSummary {
  id: string;
  amount: number;
  currency: string;
  merchantName: string | null;
  merchantCategory: string | null;
  createdAt: Date;
  status: 'pending' | 'completed' | 'declined';
}
