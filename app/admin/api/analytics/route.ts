import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, PERMISSIONS } from "@/lib/admin-auth";
import { startOfMonth, subMonths, format } from "date-fns";

export async function GET(req: NextRequest) {
    try {
        await requireRole(PERMISSIONS.VIEW_ANALYTICS);

        // 1. Core Counts
        const [totalUsers, totalMerchants, totalRevenueRaw, totalTransactions, totalUppIssuedRaw] = await Promise.all([
            prisma.user.count(),
            prisma.merchant.count({ where: { status: "active" } }),
            prisma.merchantAnalytics.aggregate({
                _sum: { totalRevenue: true },
            }),
            prisma.paylinqTransaction.count(),
            prisma.paylinqTransaction.aggregate({
                _sum: { uppEarned: true },
            }),
        ]);

        const totalRevenue = totalRevenueRaw._sum.totalRevenue || 0;
        const totalUppIssued = totalUppIssuedRaw._sum.uppEarned || 0;

        // 2. Trend Data (Last 6 months)
        const today = new Date();
        const sixMonthsAgo = startOfMonth(subMonths(today, 5));

        // Grouping by month is tricky in Prisma without raw SQL or retrieving all data.
        // Efficient way: Raw SQL or retrieving partial data.
        // For MVP/small scale, retrieving transactions with select fields is acceptable only if volume is low.
        // Better: Use groupBy if database supports it for date parts, but Prisma groupBy date is limited.
        // Best for now: Raw SQL for aggregation by month.

        /* 
          Postgres: SELECT DATE_TRUNC('month', "createdAt") as month, SUM("amount") as revenue FROM "PaylinqTransaction" ... GROUP BY month
        */

        const revenueByMonth = await prisma.$queryRaw`
      SELECT TO_CHAR("createdAt", 'YYYY-MM') as month, SUM(amount) as revenue 
      FROM "PaylinqTransaction" 
      WHERE "createdAt" >= ${sixMonthsAgo} 
      GROUP BY TO_CHAR("createdAt", 'YYYY-MM') 
      ORDER BY month ASC
    `;

        const usersByMonth = await prisma.$queryRaw`
      SELECT TO_CHAR("createdAt", 'YYYY-MM') as month, COUNT(id) as count 
      FROM "User" 
      WHERE "createdAt" >= ${sixMonthsAgo} 
      GROUP BY TO_CHAR("createdAt", 'YYYY-MM') 
      ORDER BY month ASC
    `;

        // Process raw data into chart friendly format
        const months = [];
        for (let i = 5; i >= 0; i--) {
            months.push(format(subMonths(today, i), "yyyy-MM"));
        }

        const chartData = months.map(m => {
            const rev = (revenueByMonth as any[]).find((r: any) => r.month === m);
            const usr = (usersByMonth as any[]).find((u: any) => u.month === m);
            return {
                name: format(new Date(m + "-01"), "MMM"),
                revenue: Number(rev?.revenue || 0) / 100, // Cents to dollars
                users: Number(usr?.count || 0),
            };
        });

        return NextResponse.json({
            counts: {
                users: totalUsers,
                merchants: totalMerchants,
                revenue: totalRevenue,
                transactions: totalTransactions,
                uppIssued: totalUppIssued,
            },
            charts: chartData
        });

    } catch (error) {
        console.error("Fetch Analytics Error:", error);
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }
}
