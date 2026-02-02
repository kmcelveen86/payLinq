"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import { format, parseISO } from "date-fns";

interface ChartData {
    date: string;
    revenue: number;
}

interface AdminDashboardChartsProps {
    data: ChartData[];
}

export default function AdminDashboardCharts({ data }: AdminDashboardChartsProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Global Revenue Trend (30 Days)</h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(str) => format(parseISO(str), "MMM d")}
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            tickMargin={10}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tickFormatter={(val) => `$${val}`}
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                            itemStyle={{ color: "#111827", fontWeight: 500 }}
                            labelStyle={{ color: "#6b7280", marginBottom: "0.25rem" }}
                            formatter={(val: number) => [
                                `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                                "Revenue"
                            ]}
                            labelFormatter={(label) => format(parseISO(label), "MMM d, yyyy")}
                            cursor={{ stroke: "#9ca3af", strokeDasharray: "3 3" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#2563eb"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
