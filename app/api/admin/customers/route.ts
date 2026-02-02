import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    status: z.enum(["active", "banned"]).optional(),
    sort: z.string().default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
});

export async function GET(req: NextRequest) {
    try {
        // await requireRole(["super_admin", "support", "analyst"]);

        const url = new URL(req.url);
        const params = Object.fromEntries(url.searchParams);
        const { page, limit, search, status, sort, order } = querySchema.parse(params);

        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { id: { equals: search } }, // Allow searching by ID
            ];
        }

        if (status === "banned") {
            where.banned = true;
        } else if (status === "active") {
            where.banned = false; // or undefined/null check depending on schema default
        }

        const [total, data] = await Promise.all([
            prisma.user.count({ where }),
            prisma.user.findMany({
                where,
                take: limit,
                skip,
                orderBy: { [sort]: order },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    banned: true,
                    membershipTier: true,
                    _count: {
                        select: {
                            paylinqTransactions: true,
                            accounts: true
                        }
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
        console.error("Fetch Customers Error:", error);
        return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
    }
}
