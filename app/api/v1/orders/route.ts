import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import { verifyMerchantApiKey } from "@/lib/api-keys";
import { prisma } from "@/lib/prisma";
import { awardUpp, getOrCreateUserWallet } from "@/lib/wallet";
import { calculateWowPoints } from "@/lib/rewards";
import { dispatchWebhook } from "@/lib/webhooks";

export async function POST(req: NextRequest) {
    try {
        // 1. Authentication
        const headersList = await headers();
        const authHeader = headersList.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing or invalid Authorization header" },
                { status: 401 }
            );
        }

        const apiKey = authHeader.split(" ")[1];
        const authResult = await verifyMerchantApiKey(apiKey);

        if (!authResult) {
            return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
        }

        const { merchant, scopes } = authResult;

        if (!scopes.includes("orders:write")) {
            return NextResponse.json(
                { error: "Insufficient permissions (required: orders:write)" },
                { status: 403 }
            );
        }

        // 2. Validate Payload
        const body = await req.json();
        const { user_id, amount_cents, currency = "usd", metadata } = body;

        if (!user_id || !amount_cents) {
            return NextResponse.json(
                { error: "Missing required fields: user_id, amount_cents" },
                { status: 400 }
            );
        }

        // 3. Resolve Click ID (Secure Attribution)
        // We ONLY accept an AffiliateClick ID here. Raw User IDs are NOT allowed.
        const click = await prisma.affiliateClick.findUnique({
            where: { id: user_id },
            include: { user: true }
        });

        if (!click) {
            console.warn(`[OrdersAPI] Invalid or Unknown ID: ${user_id}`);
            return NextResponse.json(
                { error: "Invalid tracking ID" },
                { status: 404 }
            );
        }

        // Check if Click is expired or already used
        if (!click.isActive || new Date() > click.expiresAt) {
            console.warn(`[OrdersAPI] Click ID expired or used: ${user_id}`);
            return NextResponse.json(
                { error: "Tracking link expired or already used" },
                { status: 400 }
            );
        }

        // Set the real user from the secure click record
        const user = click.user;
        const resolvedUserId = user.id;
        const clickId = click.id;

        // 4. Calculate Rewards
        // Determine fixed points based on Category (WOW Model)
        const category = merchant.category || "Shopping";

        // Calculate Points: Fixed logic from lib/rewards.ts
        const uppEarned = calculateWowPoints(category, amount_cents);

        console.log(`[OrdersAPI] Awards: Tier=${user.membershipTier}, Cat=${category}, FixedPoints=${uppEarned}`);

        // 5. Create Transaction
        // 5. Create Transaction
        // Use an interactive transaction for atomicity - Removed for now to avoid type issues with tx
        // const result = await prisma.$transaction(async (tx) => {

        // Create the transaction record
        const transaction = await prisma.paylinqTransaction.create({
            data: {
                merchantId: merchant.id,
                userId: user.id,
                amount: amount_cents,
                currency: currency,
                status: "COMPLETED",
                uppEarned: uppEarned,
                metadata: metadata || {},
            }
        });

        // Ensure wallet exists
        let wallet = await prisma.userWallet.findUnique({ where: { userId: user.id } });
        if (!wallet) {
            wallet = await prisma.userWallet.create({
                data: { userId: user.id, balance: 0.0 }
            });
        }

        // Create Wallet Transaction
        if (uppEarned > 0) {
            await prisma.walletTransaction.create({
                data: {
                    walletId: wallet.id,
                    amount: uppEarned,
                    type: "EARN",
                    description: `Reward from ${merchant.name}`,
                    paylinqTransactionId: transaction.id
                }
            });

            // Update Balance
            await prisma.userWallet.update({
                where: { id: wallet.id },
                data: { balance: wallet.balance + uppEarned }
            });
        }

        const result = transaction;
        // });

        // 6. Dispatch Webhooks (background task)
        // We use waitUntil if available or just fire and forget (but await here for V1 reliability)
        await dispatchWebhook(merchant.id, "order.created", {
            id: result.id,
            amount: result.amount,
            currency: result.currency,
            upp_earned: result.uppEarned,
            status: result.status,
            metadata: result.metadata
        });

        // 7. Log Analytics Event (Purchase)
        await prisma.analyticsEvent.create({
            data: {
                merchantId: merchant.id,
                type: "purchase", // Standardized event type
                userId: user.id,
                source: metadata?.source || "api",
                metadata: {
                    transactionId: result.id,
                    amount: amount_cents,
                    currency: currency
                }
            }
        });

        // 8. Invalidate Cache
        // This ensures the dashboard updates immediately
        revalidateTag("user-wallet-data", "default");
        revalidateTag("user-all-transactions", "default");
        // revalidatePath("/user/dashboard"); // Backup for server components if tags fail

        // 9. CONSUME TOKEN (Single-Use Enforcement)
        // We mark the click as inactive so it cannot be used again
        await prisma.affiliateClick.update({
            where: { id: clickId },
            data: {
                isActive: false,
                convertedAt: new Date()
            }
        });

        return NextResponse.json({
            id: result.id,
            status: "success",
            upp_earned: uppEarned,
            test_mode: apiKey.startsWith("sk_test_") // Future proofing
        }, { status: 201 });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
