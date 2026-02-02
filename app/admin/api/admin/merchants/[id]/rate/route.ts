import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getAdminAuth } from "@/lib/admin-auth";
import { logAdminAction } from "@/lib/audit";
import { z } from "zod";

const rateSchema = z.object({
    rate: z.number().min(0).max(1), // 0.0 to 1.0
    reason: z.string().min(1, "Reason is required"),
});

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // await requireRole(["super_admin"]); // STRICT: Super Admin only
        const { id } = await params;

        const body = await req.json();
        const { rate, reason } = rateSchema.parse(body);
        const { userId, email, role } = await getAdminAuth();

        const merchant = await prisma.merchant.findUnique({ where: { id } });
        if (!merchant) return NextResponse.json({ error: "Merchant not found" }, { status: 404 });

        const previousRate = merchant.commissionRate;

        const updated = await prisma.merchant.update({
            where: { id },
            data: { commissionRate: rate },
        });

        await logAdminAction({
            adminId: userId || "unknown",
            adminEmail: email || "unknown",
            adminRole: role || "unknown",
            action: "merchant.setRate",
            targetType: "merchant",
            targetId: id,
            details: { reason, previousRate, newRate: rate },
            ipAddress: req.headers.get("x-forwarded-for")
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Rate Update Error:", error);
        return NextResponse.json({ error: "Failed to update commission rate" }, { status: 500 });
    }
}
