"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Marketplace/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { TrendingUp, ShoppingBag, Clock } from "lucide-react";

export function TransactionInsights({
    activityData,
    avgOrderValue,
    repeatRate,
    purchaseFreq
}: {
    activityData?: any[],
    avgOrderValue?: number,
    repeatRate?: number,
    purchaseFreq?: number
}) {
    const data = activityData || [
        { time: "6am", value: 12 },
        { time: "9am", value: 45 },
        { time: "12pm", value: 130 },
        { time: "3pm", value: 85 },
        { time: "6pm", value: 160 },
        { time: "9pm", value: 90 },
        { time: "12am", value: 20 },
    ];

    const displayAov = avgOrderValue ?? 0;
    const displayRepeatRate = repeatRate ?? 0;
    const displayFreq = purchaseFreq ?? 0;

    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Transaction Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Metrics Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/30 rounded-xl border border-border/50 space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <ShoppingBag className="h-4 w-4 shrink-0" />
                            <span className="text-[10px] lg:text-xs font-medium whitespace-nowrap">Avg Order Value (AOV)</span>
                        </div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-xl lg:text-2xl font-bold text-foreground">${displayAov.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            <span className="text-xs text-green-500">Live</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Average size per transaction</p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl border border-border/50 space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <TrendingUp className="h-4 w-4 shrink-0" />
                            <span className="text-[10px] lg:text-xs font-medium whitespace-nowrap">Repeat Purchase Rate</span>
                        </div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-xl lg:text-2xl font-bold text-foreground">{Math.round(displayRepeatRate)}%</span>
                            <span className="text-xs text-green-500">Live</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Customers who bought {">"} 1x</p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl border border-border/50 space-y-2 col-span-1 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 shrink-0" />
                            <span className="text-[10px] lg:text-xs font-medium whitespace-nowrap">Avg Purchases / Cust</span>
                        </div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-xl lg:text-2xl font-bold text-foreground">{displayFreq.toFixed(1)}</span>
                            <span className="text-xs text-green-500">Live</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Average frequency per customer</p>
                    </div>
                </div>

                {/* Peak Activity Chart */}
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Peak Activity (Last 30 Days)</h4>
                    <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ left: 0, right: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C28F49" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#C28F49" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                                <XAxis
                                    dataKey="time"
                                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        borderColor: "hsl(var(--border))",
                                        borderRadius: "8px",
                                        color: "hsl(var(--foreground))"
                                    }}
                                    itemStyle={{ color: "hsl(var(--foreground))" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#C28F49"
                                    fillOpacity={1}
                                    fill="url(#colorActivity)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
