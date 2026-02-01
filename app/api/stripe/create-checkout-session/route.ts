import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

// Price IDs from environment
const PRICE_IDS: Record<string, { month: string; year: string }> = {
  White: {
    month: process.env.STRIPE_PRICE_WHITE_MONTHLY!,
    year: process.env.STRIPE_PRICE_WHITE_YEARLY!,
  },
  Silver: {
    month: process.env.STRIPE_PRICE_SILVER_MONTHLY!,
    year: process.env.STRIPE_PRICE_SILVER_YEARLY!,
  },
  Gold: {
    month: process.env.STRIPE_PRICE_GOLD_MONTHLY!,
    year: process.env.STRIPE_PRICE_GOLD_YEARLY!,
  },
  Black: {
    month: process.env.STRIPE_PRICE_BLACK_MONTHLY!,
    year: process.env.STRIPE_PRICE_BLACK_YEARLY!,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { tier, interval = "month" } = body as {
      tier: string;
      interval?: "month" | "year";
    };

    // Validate tier
    if (!tier || !PRICE_IDS[tier]) {
      return NextResponse.json(
        { error: `Invalid tier: ${tier}. Must be White, Silver, Gold, or Black` },
        { status: 400 }
      );
    }

    // Validate interval
    if (interval !== "month" && interval !== "year") {
      return NextResponse.json(
        { error: "Invalid interval. Must be month or year" },
        { status: 400 }
      );
    }

    // Get user from database
    // Get user from database with StripeCustomer relation
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { stripeCustomer: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get or create Stripe customer
    let customerId = user.stripeCustomer?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          clerkId: userId,
          userId: user.id,
        },
      });

      customerId = customer.id;

      // Save customer ID to database (StripeCustomer model)
      await prisma.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customerId,
        }
      });
    }

    // Get the price ID for the selected tier and interval
    const priceId = PRICE_IDS[tier][interval];

    if (!priceId) {
      return NextResponse.json(
        { error: `Price ID not configured for ${tier} ${interval}` },
        { status: 500 }
      );
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      subscription_data: {
        metadata: {
          clerkId: userId,
          userId: user.id,
          tier,
          interval,
        },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: message },
      { status: 500 }
    );
  }
}
