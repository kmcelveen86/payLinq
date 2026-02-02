import React from "react";
import { prisma } from "@/lib/prisma";
import AdminDashboardCharts from "./AdminDashboardCharts";

export default async function AdminDashboardPage() {
    // 1. Fetch High-Level Stats
    const [
        totalMerchants,
        totalCustomers,
        totalConversions,
        transactions
    ] = await Promise.all([
        prisma.merchant.count(),
        prisma.user.count(), // User model does not have 'role' field, count all users
        prisma.paylinqTransaction.count({ where: { status: "COMPLETED" } }),
        prisma.paylinqTransaction.findMany({
            where: {
                status: "COMPLETED",
                createdAt: {
                    gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
                }
            },
            select: {
                amount: true,
                createdAt: true
            },
            orderBy: { createdAt: "asc" }
        })
    ]);

    // 2. Calculate Total Revenue (All Time - or we can fetch aggregate sum from DB)
    const revenueAggregate = await prisma.paylinqTransaction.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true }
    });
    const totalRevenue = (revenueAggregate._sum.amount || 0) / 100;

    // 3. Process Chart Data
    const chartMap = new Map<string, { date: string; revenue: number }>();

    // Initialize last 30 days with 0
    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        chartMap.set(dateStr, { date: dateStr, revenue: 0 });
    }

    transactions.forEach(t => {
        const dateStr = t.createdAt.toISOString().split("T")[0];
        if (chartMap.has(dateStr)) {
            const entry = chartMap.get(dateStr)!;
            entry.revenue += t.amount / 100;
        }
    });

    const chartData = Array.from(chartMap.values());

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Stat Cards */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">Total Merchants</h3>
                    <p className="text-2xl font-bold mt-2 text-gray-900">{totalMerchants}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
                    <p className="text-2xl font-bold mt-2 text-gray-900">{totalCustomers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">Total Conversions</h3>
                    <p className="text-2xl font-bold mt-2 text-gray-900">{totalConversions}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                    <p className="text-2xl font-bold mt-2 text-gray-900">
                        {totalRevenue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </p>
                </div>
            </div>

            <AdminDashboardCharts data={chartData} />
        </div>
    );
}
