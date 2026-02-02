import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    action: z.string().optional(),
    sort: z.string().default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
});

export async function GET(req: NextRequest) {
    try {
        // await requireRole(["super_admin"]);

        const url = new URL(req.url);
        const params = Object.fromEntries(url.searchParams);
        const { page, limit, search, action, sort, order } = querySchema.parse(params);

        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { adminEmail: { contains: search, mode: "insensitive" } },
                { targetId: { equals: search } },
                { action: { contains: search, mode: "insensitive" } }
            ];
        }

        if (action) {
            where.action = action;
        }

        const [total, data] = await Promise.all([
            prisma.adminAuditLog.count({ where }),
            prisma.adminAuditLog.findMany({
                where,
                take: limit,
                skip,
                orderBy: { [sort]: order },
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
        console.error("Fetch Audit Logs Error:", error);
        return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
    }
}
