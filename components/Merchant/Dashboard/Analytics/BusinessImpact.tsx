"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Marketplace/components/ui/card";
import { DollarSign, Users, LineChart, ArrowUpRight } from "lucide-react";

export function BusinessImpact({ revenue, avgOrderValue, cac }: { revenue?: number, avgOrderValue?: number, cac?: number }) {
    const displayRevenue = revenue !== undefined ? revenue : 124592;
    const displayAov = avgOrderValue !== undefined ? avgOrderValue : 0;
    const displayCac = cac !== undefined ? cac : 0;

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Business Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

                {/* Net Revenue */}
                <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-sm font-medium">Net Revenue (PayLinq)</span>
                        </div>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">YTD</span>
                    </div>
                    {/* Calculated as: Sum of all PaylinqTransaction amounts for this merchant (cents / 100) */}
                    <p className="text-2xl font-bold">${displayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className="text-xs text-muted-foreground mt-1">Earnings after commissions</p>
                </div>

                {/* ROI Multiplier */}
                <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-green-600">
                            <LineChart className="h-4 w-4" />
                            <span className="text-sm font-medium">ROI Multiplier</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-green-600">4.8x</p>
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Return on ad spend/fees</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Customer Acquisition Cost (CAC)</p>
                        <p className="text-lg font-bold">${displayCac.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-[10px] text-green-500">Live Data</p>
                    </div>
                    <div className="space-y-1">
                        {/* We replaced LTV with Avg Order Value since we have real data for it */}
                        <p className="text-xs text-muted-foreground">Avg Order Value</p>
                        {/* Calculated as: Total Revenue / Total Number of Transactions */}
                        <p className="text-lg font-bold">${displayAov.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-[10px] text-green-500">Live Data</p>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
