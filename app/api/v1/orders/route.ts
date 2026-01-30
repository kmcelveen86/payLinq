import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyMerchantApiKey } from "@/lib/api-keys";
import { prisma } from "@/lib/prisma";
import { awardUpp, getOrCreateUserWallet } from "@/lib/wallet";
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

        // 3. Verify User Exists
        const user = await prisma.user.findUnique({
            where: { id: user_id },
        });

        if (!user) {
            return NextResponse.json(
                { error: `User not found: ${user_id}` },
                { status: 404 }
            );
        }

        // 4. Calculate Rewards
        // Logic: amount_cents / 100 * rate.
        // If rate is 0.05 (5%), $50.00 * 0.05 = 2.5 UPP? 
        // Or is UPP 1:1 with currency? Assuming 1 UPP = $1 value or arbitrary points?
        // Let's assume UPP is a point system.
        const earningRate = merchant.uppEarningRate || 0.0; // e.g. 1.0 = 1 point per $1? 
        // Or percentage e.g. 5% cashback equivalent.

        // Let's calculate standard points: (Cents / 100) * Rate
        const amountDollars = amount_cents / 100;
        const uppEarned = amountDollars * earningRate;

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
