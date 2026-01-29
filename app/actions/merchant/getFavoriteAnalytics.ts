"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getFavoriteAnalytics() {
    const { orgId } = await auth();

    if (!orgId) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const merchant = await prisma.merchant.findUnique({
            where: { clerkOrgId: orgId },
        });

        if (!merchant) {
            return { success: false, error: "Merchant not found" };
        }

        // Get recent favorites (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const favorites = await prisma.merchantFavorite.findMany({
            where: {
                merchantId: merchant.id,
                createdAt: {
                    gte: thirtyDaysAgo,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        // Group by date
        const analytics = favorites.reduce((acc: Record<string, number>, fav: { createdAt: Date }) => {
            const date = fav.createdAt.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Format for chart
        const chartData = Object.entries(analytics).map(([date, count]) => ({
            date,
            count,
        }));

        // Fill in missing dates if needed, or leave sparse

        return { success: true, data: chartData, total: favorites.length };
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return { success: false, error: "Failed to fetch analytics" };
    }
}
