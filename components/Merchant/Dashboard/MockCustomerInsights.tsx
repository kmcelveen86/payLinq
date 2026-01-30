"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Marketplace/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export function MockCustomerInsights({ newCustomers = 35, returningCustomers = 65 }: { newCustomers?: number, returningCustomers?: number }) {
    const total = newCustomers + returningCustomers;
    const returningPercentage = total > 0 ? Math.round((returningCustomers / total) * 100) : 0;

    const data = [
        { name: "New Customers", value: newCustomers },
        { name: "Returning", value: returningCustomers },
    ];

    // Handle empty state if no data
    if (total === 0) {
        data[0].value = 1; // Placeholder for visualization
        data[1].value = 0;
    }

    const COLORS = ["#2D9642", "#C28F49"]; // Brand colors

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Customer Loyalty</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="80%"
                                paddingAngle={5}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    borderColor: "hsl(var(--border))",
                                    borderRadius: "8px",
                                    color: "hsl(var(--foreground))"
                                }}
                                itemStyle={{ color: "hsl(var(--foreground))" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom Legend */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 mb-4">
                    {data.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm text-muted-foreground font-medium">
                                {entry.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="text-center pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{returningPercentage}%</span> of your customers are returning.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
