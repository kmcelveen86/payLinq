import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const params = Object.fromEntries(url.searchParams);
        const { page, limit, status } = querySchema.parse(params);

        const skip = (page - 1) * limit;

        const [total, data] = await Promise.all([
            prisma.merchantApplication.count({ where: { status } }),
            prisma.merchantApplication.findMany({
                where: { status },
                take: limit,
                skip,
                orderBy: { submittedAt: "asc" }, // Oldest first for review
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
        console.error("Fetch Merchant Apps Error:", error);
        return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
    }
}
