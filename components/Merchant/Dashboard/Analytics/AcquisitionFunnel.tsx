"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Marketplace/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight } from "lucide-react";

export function AcquisitionFunnel({ funnelData, trafficSources }: {
    funnelData?: { name: string, value: number, color: string }[],
    trafficSources?: { name: string, percentage: number }[]
}) {
    const displayFunnel = funnelData || [
        { name: "Clicks", value: 0, color: "#3b82f6" },
        { name: "Visits", value: 0, color: "#8b5cf6" },
        { name: "Added to Cart", value: 0, color: "#f97316" },
        { name: "Purchases", value: 0, color: "#22c55e" },
    ];

    const displaySources = trafficSources || [
        { name: "Direct", percentage: 0 },
        { name: "Search", percentage: 0 }
    ];

    // Calculate conversion (Purchases / Visits)
    const visits = displayFunnel.find(f => f.name === "Visits")?.value || 0;
    const purchases = displayFunnel.find(f => f.name === "Purchases")?.value || 0;
    const conversionRate = visits > 0 ? (purchases / visits) * 100 : 0;

    const payLinqPercentage = displaySources.find(s => s.name === "PayLinq App")?.percentage || 0;


    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Customer Acquisition & Traffic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Funnel Visualization */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-muted-foreground">Click-to-Purchase Funnel</h4>
                        <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">
                            {conversionRate.toFixed(1)}% Overall Conv.
                        </span>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={displayFunnel} layout="vertical" margin={{ left: 0, right: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} strokeOpacity={0.1} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={100}
                                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        borderColor: "hsl(var(--border))",
                                        borderRadius: "8px",
                                        color: "hsl(var(--foreground))"
                                    }}
                                    itemStyle={{ color: "hsl(var(--foreground))" }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} fill="hsl(var(--primary))">
                                    {/* Gradient or colored bars logic handled via cell mapping if strict coloring needed, utilizing css vars for simplicity first */}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="h-px bg-border/50" />

                {/* Traffic Sources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-muted-foreground">Traffic Attribution</h4>
                        <div className="p-4 bg-muted/30 rounded-xl border border-border/50 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">PayLinq Traffic</span>
                                <span className="text-sm font-bold text-foreground">{payLinqPercentage}%</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${payLinqPercentage}%` }} />
                            </div>
                            <p className="text-xs text-muted-foreground">Percentage of your total site traffic attributed to PayLinq referrals.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-muted-foreground">Source Breakdown</h4>
                        <div className="space-y-3">
                            {displaySources.map((source, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{source.name}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${source.percentage}%`, opacity: 0.5 + (i * 0.1) }}
                                            />
                                        </div>
                                        <span className="font-medium w-8 text-right">{source.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
