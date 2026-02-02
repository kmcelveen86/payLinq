import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminAuth } from "@/lib/admin-auth";
import { logAdminAction } from "@/lib/audit";
import { z } from "zod";

const rejectSchema = z.object({
    confirm: z.boolean(),
    notes: z.string().optional(),
});

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { notes } = rejectSchema.parse(body);
        const { userId: adminId, email, role } = await getAdminAuth();

        const application = await prisma.merchantApplication.findUnique({ where: { id } });
        if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });

        const updated = await prisma.merchantApplication.update({
            where: { id },
            data: {
                status: "rejected",
                reviewedBy: adminId,
                reviewedAt: new Date(),
                reviewNotes: notes,
            }
        });

        await logAdminAction({
            adminId: adminId || "unknown",
            adminEmail: email || "unknown",
            adminRole: role || "unknown",
            action: "merchant_application.reject",
            targetType: "merchant_application",
            targetId: id,
            details: { notes },
            ipAddress: req.headers.get("x-forwarded-for")
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Reject Application Error:", error);
        return NextResponse.json({ error: "Failed to reject" }, { status: 500 });
    }
}
