"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getUserWalletData() {
    const { userId } = await auth();
    if (!userId) return null;

    // 1. Find the user in our DB (search by clerkId first, then id)
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { clerkId: userId },
                { id: userId }
            ]
        },
        include: {
            wallet: true,
            paylinqTransactions: {
                take: 10,
                orderBy: { createdAt: "desc" },
                include: {
                    merchant: true
                }
            },
        },
    });

    if (!user || !user.wallet) return null;

    // 2. Format transactions to match dashboard UI expectations
    const formattedTransactions = user.paylinqTransactions.map((tx) => ({
        id: tx.id,
        merchant: tx.merchant.name, // Assuming merchant has a name field
        date: new Date(tx.createdAt).toLocaleDateString(),
        amount: tx.amount / 100, // Convert cents to dollars
        points: tx.uppEarned,
        category: "shopping", // Default for now
        icon: null, // Will be handled by UI
    }));

    // 3. Calculate Points This Month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // We need the internal user.id which we just fetched
    const pointsAggregation = await prisma.paylinqTransaction.aggregate({
        _sum: {
            uppEarned: true
        },
        where: {
            userId: user.id,
            createdAt: {
                gte: startOfMonth
            }
        }
    });

    return {
        totalPoints: user.wallet.balance,
        pointsThisMonth: pointsAggregation._sum.uppEarned || 0,
        transactions: formattedTransactions,
    };
}

export async function getPaylinqUser() {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { clerkId: userId },
                { id: userId }
            ]
        },
        select: {
            id: true
        }
    });

    return user;
}
