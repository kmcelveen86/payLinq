"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from "recharts";
import { format, parseISO } from "date-fns";

interface ChartData {
    date: string;
    revenue: number;
    upp: number;
}

interface MerchantAnalyticsChartsProps {
    data: ChartData[];
}

export default function MerchantAnalyticsCharts({ data }: MerchantAnalyticsChartsProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend (30 Days)</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(str) => format(parseISO(str), "MMM d")}
                                tick={{ fontSize: 12 }}
                                tickMargin={10}
                            />
                            <YAxis
                                tickFormatter={(val) => `$${val}`}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                                itemStyle={{ color: "#111827", fontWeight: 500 }}
                                labelStyle={{ color: "#6b7280", marginBottom: "0.25rem" }}
                                formatter={(val: number) => [`$${val.toFixed(2)}`, "Revenue"]}
                                labelFormatter={(label) => format(parseISO(label), "MMM d, yyyy")}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-medium text-gray-900 mb-4">UPP Rewards Issued</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(str) => format(parseISO(str), "MMM d")}
                                tick={{ fontSize: 12 }}
                                tickMargin={10}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                                itemStyle={{ color: "#111827", fontWeight: 500 }}
                                labelStyle={{ color: "#6b7280", marginBottom: "0.25rem" }}
                                formatter={(val: number) => [val.toFixed(2), "UPP"]}
                                labelFormatter={(label) => format(parseISO(label), "MMM d, yyyy")}
                                cursor={{ fill: '#f3f4f6' }}
                            />
                            <Bar dataKey="upp" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
