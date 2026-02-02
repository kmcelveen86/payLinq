import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getAdminAuth } from "@/lib/admin-auth";
import { logAdminAction } from "@/lib/audit";
import { z } from "zod";

const adjustSchema = z.object({
    userId: z.string().min(1),
    amount: z.number().int(), // positive or negative points
    reason: z.string().min(1),
});

export async function POST(req: NextRequest) {
    try {
        // await requireRole(["super_admin"]);

        const body = await req.json();
        const { userId, amount, reason } = adjustSchema.parse(body);
        const { userId: adminId, email, role } = await getAdminAuth();

        // 1. Get User Wallet
        const wallet = await prisma.userWallet.findUnique({ where: { userId } });
        if (!wallet) return NextResponse.json({ error: "User wallet not found" }, { status: 404 });

        // 2. Transact (ensure balance doesn't go negative if that's a rule? Usually admins can force)
        // We will use a transaction to ensure integrity
        const result = await prisma.$transaction(async (tx) => {
            const newBalance = wallet.balance + amount;

            // Update Wallet
            const updatedWallet = await tx.userWallet.update({
                where: { id: wallet.id },
                data: { balance: newBalance }
            });

            // Create Transaction Record
            const transaction = await tx.walletTransaction.create({
                data: {
                    walletId: wallet.id,
                    amount: amount,
                    type: "ADJUSTMENT", // or MANUAL_ADJUSTMENT if enum
                    description: `Admin Adjustment: ${reason}`,
                }
            });

            return { updatedWallet, transaction };
        });

        // 3. Audit Log
        await logAdminAction({
            adminId: adminId || "unknown",
            adminEmail: email || "unknown",
            adminRole: role || "unknown",
            action: "upp.manual_adjust",
            targetType: "user_wallet",
            targetId: wallet.id,
            details: { userId, amount, reason, newBalance: result.updatedWallet.balance },
            ipAddress: req.headers.get("x-forwarded-for")
        });

        return NextResponse.json(result);

    } catch (error) {
        console.error("UPP Adjustment Error:", error);
        return NextResponse.json({ error: "Failed to adjust balance" }, { status: 500 });
    }
}
