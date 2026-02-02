"use client";

import { useQuery } from "@tanstack/react-query";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from "recharts";

interface AnalyticsData {
    counts: {
        users: number;
        merchants: number;
        revenue: number;
        transactions: number;
        uppIssued: number;
    };
    charts: {
        name: string;
        revenue: number;
        users: number;
    }[];
}

export default function AnalyticsDashboard() {
    const { data, isLoading, error } = useQuery<AnalyticsData>({
        queryKey: ["global_analytics"],
        queryFn: async () => {
            const res = await fetch("/api/admin/analytics");
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        },
    });

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading analytics...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading data.</div>;
    if (!data) return null;

    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Total Revenue</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">${data.counts.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Active Users</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{data.counts.users.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Active Merchants</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{data.counts.merchants.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">UPP Issued</h3>
                    <p className="mt-2 text-3xl font-bold text-blue-600">{data.counts.uppIssued.toLocaleString()}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend (6 Months)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.charts}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => `$${value}`} />
                                <Tooltip formatter={(value: number) => [`$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Revenue']} />
                                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth (6 Months)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.charts}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
