import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getAdminAuth, PERMISSIONS } from "@/lib/admin-auth";
import { logAdminAction } from "@/lib/audit";
import { z } from "zod";

const suspendSchema = z.object({
    action: z.enum(["suspend", "unsuspend"]),
    reason: z.string().min(1, "Reason is required"),
});

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireRole(PERMISSIONS.MANAGE_MERCHANTS);
        const { id } = await params;

        const body = await req.json();
        const { action, reason } = suspendSchema.parse(body);
        const { userId, email, role } = await getAdminAuth();

        // Verify merchant exists
        const merchant = await prisma.merchant.findUnique({ where: { id } });
        if (!merchant) return NextResponse.json({ error: "Merchant not found" }, { status: 404 });

        const newStatus = action === "suspend" ? "suspended" : "active";

        // Update DB
        const updated = await prisma.merchant.update({
            where: { id },
            data: { status: newStatus },
        });

        // Audit Log
        await logAdminAction({
            adminId: userId || "unknown",
            adminEmail: email || "unknown",
            adminRole: role || "unknown",
            action: `merchant.${action}`,
            targetType: "merchant",
            targetId: id,
            details: { reason, previousStatus: merchant.status, newStatus },
            ipAddress: req.headers.get("x-forwarded-for")
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Suspend Merchant Error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update merchant status" }, { status: 500 });
    }
}
