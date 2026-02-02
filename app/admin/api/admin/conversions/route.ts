import { NextRequest, NextResponse } from "next/server";
import { getAdminConversions } from "@/lib/admin-cache";
import { requireRole, PERMISSIONS } from "@/lib/admin-auth";
import { z } from "zod";

const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    status: z.enum(["COMPLETED", "PENDING", "FAILED"]).optional(),
    minAmount: z.coerce.number().optional(),
    maxAmount: z.coerce.number().optional(),
    sort: z.string().default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
});

export async function GET(req: NextRequest) {
    try {
        await requireRole(PERMISSIONS.VIEW_UPP);
        const url = new URL(req.url);
        const params = Object.fromEntries(url.searchParams);
        const { page, limit, search, status, minAmount, maxAmount, sort, order } = querySchema.parse(params);

        const { total, data } = await getAdminConversions({
            page,
            limit,
            search,
            status,
            minAmount,
            maxAmount,
            sort,
            order: order as "asc" | "desc"
        });

        return NextResponse.json({
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Fetch Conversions Error:", error);
        return NextResponse.json({ error: "Failed to fetch conversions" }, { status: 500 });
    }
}
