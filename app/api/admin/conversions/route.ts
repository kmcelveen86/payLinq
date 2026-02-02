import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    status: z.string().optional(),
    minAmount: z.coerce.number().optional(),
    merchantId: z.string().optional(),
});

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const params = Object.fromEntries(url.searchParams);
        const { page, limit, search, status, minAmount, merchantId } = querySchema.parse(params);

        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { id: { equals: search } }, // Exact ID match
                { user: { email: { contains: search, mode: "insensitive" } } },
                { merchant: { name: { contains: search, mode: "insensitive" } } },
            ];
        }

        if (status) {
            where.status = status;
        }

        if (minAmount) {
            where.amount = { gte: minAmount * 100 }; // Convert to cents
        }

        if (merchantId) {
            where.merchantId = merchantId;
        }

        const [total, data] = await Promise.all([
            prisma.paylinqTransaction.count({ where }),
            prisma.paylinqTransaction.findMany({
                where,
                include: {
                    user: { select: { email: true, firstName: true, lastName: true } },
                    merchant: { select: { name: true } }
                },
                take: limit,
                skip,
                orderBy: { createdAt: "desc" },
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
        console.error("Fetch Conversions Error:", error);
        return NextResponse.json({ error: "Failed to fetch conversions" }, { status: 500 });
    }
}
