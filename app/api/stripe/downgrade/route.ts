import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user from database with StripeCustomer relation
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: { stripeCustomer: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update DB to White tier immediately so UI reflects it
        await prisma.user.update({
            where: { id: user.id },
            data: { membershipTier: "White" },
        });

        // If they have a stripe customer ID, try to cancel active subscriptions
        if (user.stripeCustomer?.stripeCustomerId) {
            const subscriptions = await stripe.subscriptions.list({
                customer: user.stripeCustomer.stripeCustomerId,
                status: 'active',
                limit: 1,
            });

            if (subscriptions.data.length > 0) {
                // Cancel at period end to avoid prorating issues, but we already updated DB to White
                // so user sees the change. They basically forfeit the rest of the paid term in the UI
                // (or we could show "White (Pending)" but user requested "White").
                // We will cancel at period end so they don't get billed next cycle.
                await stripe.subscriptions.update(subscriptions.data[0].id, {
                    cancel_at_period_end: true,
                });
            }
        }

        // Revalidate cache
        revalidatePath("/user/dashboard");
        revalidatePath("/api/users/profile");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error processing downgrade:", error);
        return NextResponse.json(
            { error: "Failed to process downgrade" },
            { status: 500 }
        );
    }
}
