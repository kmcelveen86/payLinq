import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe, STRIPE_PRICES, getFriendlyStripeError } from '@/lib/stripe';
import prisma from '@/lib/prisma';

// Price ID to membership tier mapping
const PRICE_TO_TIER: Record<string, string> = {
  // White
  [STRIPE_PRICES.WHITE.MONTHLY]: 'White',
  [STRIPE_PRICES.WHITE.YEARLY]: 'White',
  // Silver
  [STRIPE_PRICES.SILVER.MONTHLY]: 'Silver',
  [STRIPE_PRICES.SILVER.YEARLY]: 'Silver',
  // Gold
  [STRIPE_PRICES.GOLD.MONTHLY]: 'Gold',
  [STRIPE_PRICES.GOLD.YEARLY]: 'Gold',
  // Black
  [STRIPE_PRICES.BLACK.MONTHLY]: 'Black',
  [STRIPE_PRICES.BLACK.YEARLY]: 'Black',
};

// Helper to extract tier from subscription
function getTierFromSubscription(subscription: Stripe.Subscription): string | null {
  const priceId = subscription.items.data[0]?.price?.id;
  if (!priceId) return null;
  return PRICE_TO_TIER[priceId] || null;
}

// Helper to get billing cycle from subscription
function getBillingCycleFromSubscription(subscription: Stripe.Subscription): string {
  const interval = subscription.items.data[0]?.price?.recurring?.interval;
  return interval === 'year' ? 'yearly' : 'monthly';
}

// Helper to find user by Stripe customer ID
async function findUserByStripeCustomerId(stripeCustomerId: string) {
  // First try the direct stripeCustomerId field on User
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId },
  });
  if (user) return user;

  // Fallback to StripeCustomer relation
  const stripeCustomer = await prisma.stripeCustomer.findUnique({
    where: { stripeCustomerId },
    include: { user: true },
  });
  return stripeCustomer?.user || null;
}

// Helper to update user membership
async function updateUserMembership(
  userId: string,
  membershipTier: string | null,
  billingCycle?: string
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      membershipTier,
      ...(billingCycle && { billingCycle }),
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('Missing Stripe signature');
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  console.log(`Processing webhook event: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode !== 'subscription') {
          console.log('Checkout session is not a subscription, skipping');
          break;
        }

        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (!customerId || !subscriptionId) {
          console.error('Missing customer or subscription ID in checkout session');
          break;
        }

        // Retrieve the full subscription to get price details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const tier = getTierFromSubscription(subscription);
        const billingCycle = getBillingCycleFromSubscription(subscription);

        if (!tier) {
          console.error(`Unknown price ID in subscription: ${subscription.items.data[0]?.price?.id}`);
          break;
        }

        const user = await findUserByStripeCustomerId(customerId);
        if (!user) {
          console.error(`No user found for Stripe customer: ${customerId}`);
          break;
        }

        await updateUserMembership(user.id, tier, billingCycle);
        console.log(`Updated user ${user.id} to ${tier} tier (${billingCycle})`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await findUserByStripeCustomerId(customerId);
        if (!user) {
          console.error(`No user found for Stripe customer: ${customerId}`);
          break;
        }

        // Check if subscription is active
        if (subscription.status === 'active' || subscription.status === 'trialing') {
          const tier = getTierFromSubscription(subscription);
          const billingCycle = getBillingCycleFromSubscription(subscription);

          if (tier) {
            await updateUserMembership(user.id, tier, billingCycle);
            console.log(`Updated user ${user.id} to ${tier} tier (${billingCycle})`);
          }
        } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
          // Downgrade to White (free) tier
          await updateUserMembership(user.id, 'White');
          console.log(`Downgraded user ${user.id} to White tier (subscription ${subscription.status})`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await findUserByStripeCustomerId(customerId);
        if (!user) {
          console.error(`No user found for Stripe customer: ${customerId}`);
          break;
        }

        // Downgrade to White (free) tier
        await updateUserMembership(user.id, 'White');
        console.log(`Downgraded user ${user.id} to White tier (subscription deleted)`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const user = await findUserByStripeCustomerId(customerId);
        if (!user) {
          console.error(`No user found for Stripe customer: ${customerId}`);
          break;
        }

        // Get friendly error message
        // Attempt to get the PaymentIntent to see the specific decline code
        const invoiceObj = invoice as any;
        if (invoiceObj.payment_intent) {
          // We might need to fetch the PI if it's expanded or just an ID
          // For simplicity in webhooks, we can try to look at last_payment_error on the invoice directly if available
          // or fetch the PI. Stripe Invoice object usually has last_finalization_error or similar, 
          // but the 'payment_intent' object on the event might be expanded depending on config.
          // However, for safety/speed, we'll try to fetch or just use a generic message if heavy.
          // Actually, let's use the helper on the available data.
          // If invoice.payment_intent is a string, we'd need to fetch it.
        }

        // Use helper - passing the whole object usually doesn't work well unless it matches the shape.
        // But we can check invoice.last_finalization_error
        // @ts-ignore
        const errorMessage = getFriendlyStripeError(invoice.last_finalization_error || "generic_decline");

        console.warn(`Payment failed for user ${user.id} (${user.email}): ${errorMessage}`);

        // TODO: Send notification to user with this friendly message
        // await sendNotification(user.email, "Payment Failed", errorMessage);
        break;
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        // @ts-ignore
        const customerId = dispute.customer as string; // Customer might be null if charge was created without customer

        if (!customerId) {
          console.log('Dispute created but no customer ID available on object');
          break;
        }

        const user = await findUserByStripeCustomerId(customerId);
        if (!user) {
          console.error(`No user found for Stripe customer: ${customerId}`);
          break;
        }

        console.warn(`Dispute created for user ${user.id}. Reason: ${dispute.reason}`);

        // Ban the user and downgrade to free tier
        await prisma.user.update({
          where: { id: user.id },
          data: {
            banned: true,
            bannedReason: `Stripe Dispute: ${dispute.reason}`,
            membershipTier: null, // Remove from any tier
          }
        });

        console.log(`User ${user.id} has been banned and downgraded due to dispute.`);
        console.log(`User ${user.id} has been banned and downgraded due to dispute.`);
        break;
      }

      case 'charge.dispute.closed': {
        const dispute = event.data.object as Stripe.Dispute;
        // @ts-ignore
        const customerId = dispute.customer as string;

        if (!customerId) {
          break;
        }

        const user = await findUserByStripeCustomerId(customerId);
        if (!user) {
          console.error(`No user found for Stripe customer: ${customerId}`);
          break;
        }

        if (dispute.status === 'won') {
          console.log(`Dispute won for user ${user.id}. Unbanning.`);

          await prisma.user.update({
            where: { id: user.id },
            data: {
              banned: false,
              bannedReason: null,
              // We don't automatically restore the tier here as it might be complex (which tier? did they pay?)
              // But unbanning allows them to login and resubscribe.
            }
          });
        } else {
          console.log(`Dispute closed with status: ${dispute.status} for user ${user.id}. Ban remains.`);
        }
        break;
      }

      case 'radar.early_fraud_warning.created': {
        const warning = event.data.object as Stripe.Radar.EarlyFraudWarning;
        // @ts-ignore
        const customerId = warning.charge.customer; // This structure depends on expansion, simplified here

        // Warn logs
        console.warn(`Radar Early Fraud Warning: ${warning.actionable ? 'Actionable' : 'Informational'} - Fraud Type: ${warning.fraud_type}`);

        // We could notify admins here
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Stripe webhooks require the raw body, so we need to disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};
