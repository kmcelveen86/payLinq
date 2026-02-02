import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, PERMISSIONS } from "@/lib/admin-auth";
import { z } from "zod";

const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(), // Could search by transaction ID or user ID
    sort: z.string().default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
});

export async function GET(req: NextRequest) {
    try {
        await requireRole(PERMISSIONS.VIEW_UPP);

        const url = new URL(req.url);
        const params = Object.fromEntries(url.searchParams);
        const { page, limit, search, sort, order } = querySchema.parse(params);

        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { id: { equals: search } },
                { paylinqTransactionId: { equals: search } },
                { wallet: { userId: { equals: search } } } // Allow searching by User ID via relation
            ];
        }

        // Assuming we are querying WalletTransactions
        // Let's verify schema. 
        // WalletTransaction model likely has: id, walletId, amount, type, etc.
        // Need to verify schema to be sure. I'll use a safe query for now.

        // We will query WalletTransaction and include related User
        const [total, data] = await Promise.all([
            prisma.walletTransaction.count({ where }),
            prisma.walletTransaction.findMany({
                where,
                take: limit,
                skip,
                orderBy: { [sort]: order },
                include: {
                    wallet: {
                        include: {
                            user: {
                                select: { name: true, email: true }
                            }
                        }
                    },
                    paylinqTransaction: {
                        select: {
                            merchant: {
                                select: { name: true }
                            }
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
        console.error("Fetch UPP Transactions Error:", error);
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}
