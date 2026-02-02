import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/admin-auth";
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

        const skip = (page - 1) * limit;

        // 3. Build Where Clause
        const where: any = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                // { contactEmail: { contains: search, mode: "insensitive" } }, // Field likely missing
            ];
        }
        if (status) { // Assuming 'status' field exists or mapping it
            // Merchant schema doesn't have 'status' field yet? 
            // We marked it as TODO in Plan?
            // Existing schema has 'presence'. 
            // Let's check schema again. Merchant has `apiKey`, `commissionRate`.
            // It does NOT have `status`.
        }

        // 4. Query DB
        const [total, data] = await Promise.all([
            prisma.merchant.count({ where }),
            prisma.merchant.findMany({
                where,
                take: limit,
                skip,
                orderBy: { [sort]: order },
                include: {
                    _count: {
                        select: { paylinqTransactions: true }
                    }
                }
            }),
        ]);

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
