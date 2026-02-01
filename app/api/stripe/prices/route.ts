import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

// Map product names to tier names for consistency
const PRODUCT_TO_TIER: Record<string, string> = {
  "PayLinq White": "White",
  "PayLinq Silver": "Silver",
  "PayLinq Gold": "Gold",
  "PayLinq Black": "Black",
};

export async function GET() {
  try {
    // Fetch all active products
    const products = await stripe.products.list({
      active: true,
      limit: 10,
    });

    // Fetch all active prices
    const prices = await stripe.prices.list({
      active: true,
      limit: 20,
      expand: ["data.product"],
    });

    // Build pricing data keyed by tier
    const tiers: Record<
      string,
      {
        productId: string;
        name: string;
        description: string | null;
        monthlyPrice: number | null;
        monthlyPriceId: string | null;
        yearlyPrice: number | null;
        yearlyPriceId: string | null;
      }
    > = {};

    for (const price of prices.data) {
      const product = price.product as Stripe.Product;
      const tierName = PRODUCT_TO_TIER[product.name] || product.name;

      if (!tiers[tierName]) {
        tiers[tierName] = {
          productId: product.id,
          name: tierName,
          description: product.description,
          monthlyPrice: null,
          monthlyPriceId: null,
          yearlyPrice: null,
          yearlyPriceId: null,
        };
      }

      // Convert from cents to dollars
      const amount = price.unit_amount ? price.unit_amount / 100 : 0;

      if (price.recurring?.interval === "month") {
        tiers[tierName].monthlyPrice = amount;
        tiers[tierName].monthlyPriceId = price.id;
      } else if (price.recurring?.interval === "year") {
        tiers[tierName].yearlyPrice = amount;
        tiers[tierName].yearlyPriceId = price.id;
      }
    }

    // Convert to array and sort by monthly price
    const tierOrder = ["White", "Silver", "Gold", "Black"];
    const sortedTiers = tierOrder
      .map((name) => tiers[name])
      .filter(Boolean);

    return NextResponse.json({ tiers: sortedTiers });
  } catch (error) {
    console.error("Error fetching Stripe prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 500 }
    );
  }
}
