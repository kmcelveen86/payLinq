import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, PERMISSIONS } from "@/lib/admin-auth";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Params are async in Next.js 15+
) {
    try {
        await requireRole(PERMISSIONS.VIEW_MERCHANTS);
        const { id } = await params;

        const merchant = await prisma.merchant.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        paylinqTransactions: true,
                        offers: true,
                        analyticsEvents: true,
                    },
                },
                analytics: true,
            },
        });

        if (!merchant) {
            return NextResponse.json({ error: "Merchant not found" }, { status: 404 });
        }

        // Calculate some stats on the fly if needed, or rely on MerchantAnalytics
        // For now, returning raw merchant data + counts
        return NextResponse.json(merchant);
    } catch (error) {
        console.error("Get Merchant Error:", error);
        return NextResponse.json({ error: "Failed to fetch merchant" }, { status: 500 });
    }
}
