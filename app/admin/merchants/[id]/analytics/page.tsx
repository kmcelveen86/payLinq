import MerchantTabs from "../MerchantTabs";
import Link from "next/link";
import { notFound } from "next/navigation";
import MerchantAnalyticsCharts from "./MerchantAnalyticsCharts";

export default async function MerchantAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { prisma } = await import("@/lib/prisma");

    const merchant = await prisma.merchant.findUnique({
        where: { id },
        select: { id: true, name: true }
    });

    if (!merchant) return notFound();

    const transactions = await prisma.paylinqTransaction.findMany({
        where: {
            merchantId: id,
            status: "COMPLETED",
            createdAt: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
        },
        select: {
            amount: true,
            uppEarned: true,
            createdAt: true,
            userId: true
        },
        orderBy: { createdAt: "asc" }
    });

    // Summary Stats (All Time) - Fetch separately for accuracy
    const summary = await prisma.merchant.findUnique({
        where: { id },
        select: {
            _count: { select: { paylinqTransactions: true } },
            analytics: { select: { totalRevenue: true, totalCustomers: true } }
        }
    });

    // Process Chart Data
    const chartMap = new Map<string, { date: string; revenue: number; upp: number }>();

    // Initialize last 30 days with 0
    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        chartMap.set(dateStr, { date: dateStr, revenue: 0, upp: 0 });
    }

    transactions.forEach(t => {
        const dateStr = t.createdAt.toISOString().split("T")[0];
        if (chartMap.has(dateStr)) {
            const entry = chartMap.get(dateStr)!;
            entry.revenue += t.amount / 100; // Convert cents to dollars
            entry.upp += t.uppEarned;
        }
    });

    const chartData = Array.from(chartMap.values());

    const totalRevenue30d = transactions.reduce((sum, t) => sum + t.amount, 0) / 100;
    const totalUpp30d = transactions.reduce((sum, t) => sum + t.uppEarned, 0);
    const uniqueUsers30d = new Set(transactions.map(t => t.userId)).size;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/merchants" className="text-gray-500 hover:text-gray-900 border rounded px-2 py-1 text-sm">
                        ← Back
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{merchant.name}</h1>
                </div>
            </div>

            <MerchantTabs id={id} />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow border">
                    <dt className="text-xs font-semibold text-gray-500 uppercase">30d Revenue</dt>
                    <dd className="mt-1 text-2xl font-bold text-gray-900">
                        {totalRevenue30d.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </dd>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <dt className="text-xs font-semibold text-gray-500 uppercase">30d UPP Issued</dt>
                    <dd className="mt-1 text-2xl font-bold text-blue-600">
                        {totalUpp30d.toFixed(2)}
                    </dd>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <dt className="text-xs font-semibold text-gray-500 uppercase">30d Transactions</dt>
                    <dd className="mt-1 text-2xl font-bold text-gray-900">
                        {transactions.length}
                    </dd>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <dt className="text-xs font-semibold text-gray-500 uppercase">30d Unique Customers</dt>
                    <dd className="mt-1 text-2xl font-bold text-gray-900">
                        {uniqueUsers30d}
                    </dd>
                </div>
            </div>

            {/* Charts */}
            <MerchantAnalyticsCharts data={chartData} />
        </div>
    );
}
