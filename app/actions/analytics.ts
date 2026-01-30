"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getMerchantId } from "./merchant";

export async function getMerchantAnalytics() {
    const merchantId = await getMerchantId();

    // 1. Transaction Stats
    const transactions = await prisma.paylinqTransaction.findMany({
        where: { merchantId },
        orderBy: { createdAt: "desc" },
        take: 100, // For recent activity chart
    });

    const totalRevenueCents = transactions.reduce((acc, t) => acc + t.amount, 0);
    const totalRevenue = totalRevenueCents / 100;

    const totalUppIssued = transactions.reduce((acc, t) => acc + t.uppEarned, 0);

    // 3. Recent Sales count vs last month (mock comparison for now)
    const salesCount = transactions.length;

    // 4. Customer Loyalty (New vs Returning)
    const userTransactionCounts = await prisma.paylinqTransaction.groupBy({
        by: ['userId'],
        where: { merchantId },
        _count: {
            id: true
        }
    });

    let newCustomers = 0;
    let returningCustomers = 0;

    userTransactionCounts.forEach(group => {
        if (group._count.id === 1) {
            newCustomers++;
        } else {
            returningCustomers++;
        }
    });

    // Handle case with 0 customers to avoid division by zero or empty charts
    if (newCustomers === 0 && returningCustomers === 0) {
        newCustomers = 0;
        returningCustomers = 0;
    }

    // 5. Avg Order Value
    const avgOrderValue = salesCount > 0 ? totalRevenue / salesCount : 0;

    // 6. Avg UPP per Transaction
    const avgUppPerTx = salesCount > 0 ? totalUppIssued / salesCount : 0;

    // 7. Repeat Purchase Rate & Freq
    const totalCustomers = newCustomers + returningCustomers;
    const repeatPurchaseRate = totalCustomers > 0 ? (returningCustomers / totalCustomers) * 100 : 0;
    const avgPurchasesPerCustomer = totalCustomers > 0 ? salesCount / totalCustomers : 0;

    // 8. Activity Data (Bucketed by 3-hour blocks)
    // Initialize buckets: 0-2 (12am), 3-5 (3am), 6-8 (6am), etc.
    const timeBuckets = {
        "12am": 0, "3am": 0, "6am": 0, "9am": 0,
        "12pm": 0, "3pm": 0, "6pm": 0, "9pm": 0
    };

    transactions.forEach(t => {
        const date = new Date(t.createdAt);
        const hour = date.getHours(); // 0-23 locally (server time, usually UTC, potentially need adjustment but for now use server time)

        if (hour >= 0 && hour < 3) timeBuckets["12am"]++;
        else if (hour >= 3 && hour < 6) timeBuckets["3am"]++;
        else if (hour >= 6 && hour < 9) timeBuckets["6am"]++;
        else if (hour >= 9 && hour < 12) timeBuckets["9am"]++;
        else if (hour >= 12 && hour < 15) timeBuckets["12pm"]++;
        else if (hour >= 15 && hour < 18) timeBuckets["3pm"]++;
        else if (hour >= 18 && hour < 21) timeBuckets["6pm"]++;
        else timeBuckets["9pm"]++;
    });

    // Convert to array format for Recharts
    // Order: 6am -> 9am -> 12pm -> 3pm -> 6pm -> 9pm -> 12am -> 3am (or standard day start)
    // Let's stick to the visible range in the mock: 6am to 12am
    const activityData = [
        { time: "6am", value: timeBuckets["6am"] },
        { time: "9am", value: timeBuckets["9am"] },
        { time: "12pm", value: timeBuckets["12pm"] },
        { time: "3pm", value: timeBuckets["3pm"] },
        { time: "6pm", value: timeBuckets["6pm"] },
        { time: "9pm", value: timeBuckets["9pm"] },
        { time: "12am", value: timeBuckets["12am"] },
        // Excluding 3am for now to match UI or add if needed
    ];

    // 9. UPP Issued This Month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Since we only fetched 100 transactions, this might not be 100% accurate if there are >100 transactions this month.
    // For a robust solution, we should probably do a separate count query or an aggregate.
    // But for now, let's use what we have in memory or do a quick aggregate if we want precision.
    // Let's do a quick aggregate for "this month" to be accurate.
    const monthAggregate = await prisma.paylinqTransaction.aggregate({
        where: {
            merchantId,
            createdAt: { gte: firstDayOfMonth }
        },
        _sum: {
            uppEarned: true
        }
    });

    const uppIssuedThisMonth = monthAggregate._sum.uppEarned || 0;

    // 10. Daily Revenue (Last 7 Days)
    const dailyRevenueMap = new Map<string, number>();
    const last7Days = [];

    // Initialize last 7 days keys
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayKey = d.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // e.g., "Jan 25"
        dailyRevenueMap.set(dayKey, 0);
        last7Days.push(dayKey);
    }

    // Populate revenue map
    transactions.forEach(t => {
        const d = new Date(t.createdAt);
        const dayKey = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (dailyRevenueMap.has(dayKey)) {
            dailyRevenueMap.set(dayKey, dailyRevenueMap.get(dayKey)! + (t.amount / 100));
        }
    });

    // Convert to array
    const revenueData = last7Days.map(date => ({
        date,
        revenue: dailyRevenueMap.get(date) || 0
    }));

    // 11. Offer Performance (Aggregate)
    const offerStats = await prisma.offer.aggregate({
        where: { merchantId },
        _sum: {
            views: true,
            clicks: true,
            redemptions: true
        }
    });

    const offerPerformance = {
        views: offerStats._sum.views || 0,
        clicks: offerStats._sum.clicks || 0,
        redemptions: offerStats._sum.redemptions || 0,
        conversionRate: 0
    };

    if (offerPerformance.views > 0) {
        offerPerformance.conversionRate = (offerPerformance.redemptions / offerPerformance.views) * 100;
    }

    return {
        revenue: totalRevenue,
        uppIssued: totalUppIssued,
        uppIssuedThisMonth,
        salesCount,
        cac: 0,
        avgOrderValue,
        avgUppPerTx,
        repeatPurchaseRate,
        avgPurchasesPerCustomer,
        totalRedemptions: salesCount,
        offerPerformance, // Add this new object
        customerLoyalty: { new: newCustomers, returning: returningCustomers },
        transactions: transactions.map(t => ({
            ...t,
            amount: t.amount / 100
        })),
        activityData,
        revenueData
    };
}
