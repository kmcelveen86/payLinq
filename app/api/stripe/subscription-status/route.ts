import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// Tier mapping based on price IDs
const TIER_MAP: Record<string, string> = {
  [process.env.STRIPE_PRICE_SILVER_MONTHLY!]: "silver",
  [process.env.STRIPE_PRICE_SILVER_YEARLY!]: "silver",
  [process.env.STRIPE_PRICE_GOLD_MONTHLY!]: "gold",
  [process.env.STRIPE_PRICE_GOLD_YEARLY!]: "gold",
  [process.env.STRIPE_PRICE_BLACK_MONTHLY!]: "black",
  [process.env.STRIPE_PRICE_BLACK_YEARLY!]: "black",
};

interface SubscriptionStatus {
  tier: "white" | "silver" | "gold" | "black";
  status: "active" | "canceled" | "past_due" | "trialing" | "none";
  billingPeriod: "monthly" | "yearly" | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  subscription: {
    id: string;
    priceId: string;
  } | null;
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Default status for users without Stripe customer
    const defaultStatus: SubscriptionStatus = {
      tier: "white",
      status: "none",
      billingPeriod: null,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
      subscription: null,
    };

    if (!user.stripeCustomerId) {
      return NextResponse.json(defaultStatus);
    }

    // Fetch subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: "all",
      limit: 1,
      expand: ["data.default_payment_method"],
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json(defaultStatus);
    }

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0]?.price.id;
    const price = subscription.items.data[0]?.price;

    // Determine tier from price ID
    const tier = (TIER_MAP[priceId] || "white") as SubscriptionStatus["tier"];

    // Determine billing period from price interval
    let billingPeriod: "monthly" | "yearly" | null = null;
    if (price?.recurring) {
      if (price.recurring.interval === "month") {
        billingPeriod = "monthly";
      } else if (price.recurring.interval === "year") {
        billingPeriod = "yearly";
      }
    }

    // Map Stripe status to our status
    const statusMap: Record<Stripe.Subscription.Status, SubscriptionStatus["status"]> = {
      active: "active",
      canceled: "canceled",
      past_due: "past_due",
      trialing: "trialing",
      incomplete: "none",
      incomplete_expired: "none",
      unpaid: "past_due",
      paused: "canceled",
    };

    // Get current_period_end from subscription item
    const subscriptionItem = subscription.items.data[0];
    const currentPeriodEnd = subscriptionItem?.current_period_end;

    const status: SubscriptionStatus = {
      tier: subscription.status === "active" || subscription.status === "trialing" ? tier : "white",
      status: statusMap[subscription.status] || "none",
      billingPeriod,
      currentPeriodEnd: currentPeriodEnd 
        ? new Date(currentPeriodEnd * 1000).toISOString()
        : null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      subscription: {
        id: subscription.id,
        priceId,
      },
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription status" },
      { status: 500 }
    );
  }
}
