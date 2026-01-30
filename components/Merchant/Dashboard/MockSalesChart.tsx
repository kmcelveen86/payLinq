"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Marketplace/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";

export function MockSalesChart() {
    const data = [
        { date: "Jan 1", revenue: 120 },
        { date: "Jan 5", revenue: 350 },
        { date: "Jan 10", revenue: 280 },
        { date: "Jan 15", revenue: 590 },
        { date: "Jan 20", revenue: 450 },
        { date: "Jan 25", revenue: 890 },
        { date: "Jan 30", revenue: 1050 },
    ];

    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">Revenue Overview</CardTitle>
                    <div className="flex items-center text-sm text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                        <TrendingUp className="mr-1 h-3 w-3" /> +12.5%
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pl-0">
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#C28F49" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#C28F49" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    borderColor: "hsl(var(--border))",
                                    borderRadius: "8px",
                                    color: "hsl(var(--foreground))"
                                }}
                                itemStyle={{ color: "hsl(var(--foreground))" }}
                                formatter={(value) => [`$${value}`, "Revenue"]}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#C28F49"
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
