import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/admin-auth";
import { getAdminMerchants } from "@/lib/admin-cache";
import { z } from "zod";

const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    status: z.enum(["active", "suspended", "pending"]).optional(),
    sort: z.string().default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
});

export async function GET(req: NextRequest) {
    try {
        // 1. Auth Check (Mocked for now, will implement real check)
        // await requireRole(["super_admin", "support", "analyst"]);

        // 2. Parse Query
        const url = new URL(req.url);
        const params = Object.fromEntries(url.searchParams);
        const { page, limit, search, status, sort, order } = querySchema.parse(params);

        // 4. Query DB (Cached)
        const { total, data } = await getAdminMerchants({
            page,
            limit,
            search,
            status,
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
        console.error("Fetch Merchants Error:", error);
        return NextResponse.json({ error: "Failed to fetch merchants" }, { status: 500 });
    }
}
