import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
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

    // Check if customer already exists
    if (user.stripeCustomerId) {
      // Verify customer exists in Stripe
      try {
        const existingCustomer = await stripe.customers.retrieve(
          user.stripeCustomerId
        );

        if (!existingCustomer.deleted) {
          return NextResponse.json({
            customerId: user.stripeCustomerId,
            message: "Customer already exists",
          });
        }
      } catch {
        // Customer doesn't exist in Stripe, create a new one
      }
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name || undefined,
      metadata: {
        clerkId: userId,
        userId: user.id,
      },
    });

    // Save customer ID to database
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });

    return NextResponse.json({
      customerId: customer.id,
      message: "Customer created successfully",
    });
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    return NextResponse.json(
      { error: "Failed to create Stripe customer" },
      { status: 500 }
    );
  }
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
      select: { stripeCustomerId: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.stripeCustomerId) {
      return NextResponse.json({ customerId: null });
    }

    // Optionally fetch customer details from Stripe
    try {
      const customer = await stripe.customers.retrieve(user.stripeCustomerId);

      if (customer.deleted) {
        return NextResponse.json({ customerId: null });
      }

      return NextResponse.json({
        customerId: user.stripeCustomerId,
        email: customer.email,
      });
    } catch {
      return NextResponse.json({ customerId: null });
    }
  } catch (error) {
    console.error("Error fetching Stripe customer:", error);
    return NextResponse.json(
      { error: "Failed to fetch Stripe customer" },
      { status: 500 }
    );
  }
}
