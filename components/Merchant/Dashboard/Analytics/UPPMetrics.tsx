"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Marketplace/components/ui/card";
import { Coins, Zap, Trophy } from "lucide-react";

import { useState, useEffect } from "react";
import { getMerchantAnalytics } from "@/app/actions/analytics";

export function UPPMetrics({
    uppIssued,
    avgUppPerTx,
    uppIssuedThisMonth
}: {
    uppIssued?: number,
    avgUppPerTx?: number,
    uppIssuedThisMonth?: number
}) {
    const [displayIssued, setDisplayIssued] = useState(uppIssued !== undefined ? uppIssued : 142500);
    const [displayAvgUpp, setDisplayAvgUpp] = useState(avgUppPerTx !== undefined ? avgUppPerTx : 120);
    const [displayMonthIssued, setDisplayMonthIssued] = useState(uppIssuedThisMonth !== undefined ? uppIssuedThisMonth : 15000);

    useEffect(() => {
        // Update local state if prop changes (initial load)
        if (uppIssued !== undefined) {
            setDisplayIssued(uppIssued);
        }
        if (avgUppPerTx !== undefined) {
            setDisplayAvgUpp(avgUppPerTx);
        }
        if (uppIssuedThisMonth !== undefined) {
            setDisplayMonthIssued(uppIssuedThisMonth);
        }
    }, [uppIssued, avgUppPerTx, uppIssuedThisMonth]);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const data = await getMerchantAnalytics();
                if (data && typeof data.uppIssued === 'number') {
                    setDisplayIssued(data.uppIssued);
                }
                if (data && typeof data.avgUppPerTx === 'number') {
                    setDisplayAvgUpp(data.avgUppPerTx);
                }
                if (data && typeof data.uppIssuedThisMonth === 'number') {
                    setDisplayMonthIssued(data.uppIssuedThisMonth);
                }
            } catch (error) {
                console.error("Failed to poll UPP metrics:", error);
            }
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="col-span-1">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">UPP Tokenomics</CardTitle>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-medium text-green-600 uppercase tracking-wider">Live</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Total Issued */}
                <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-500/20 text-yellow-500 rounded-lg">
                            <Coins className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-yellow-500">Total UPP Issued</span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                        <span className="text-2xl lg:text-3xl font-bold transition-all duration-300">
                            {displayIssued.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                        <span className="text-xs text-muted-foreground">Tokens</span>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                        <span className="text-green-500 font-medium">+{displayMonthIssued.toLocaleString()}</span> this month
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Avg per Tx */}
                    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50 gap-2 xl:gap-0">
                        <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-xs lg:text-sm font-medium whitespace-nowrap">Avg UPP / Transaction</span>
                        </div>
                        <span className="font-bold whitespace-nowrap">{Math.round(displayAvgUpp)} UPP</span>
                    </div>

                    {/* Campaign Performance */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="h-4 w-4" />
                            <span>Active Campaigns</span>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">Weekend 2x Boost</span>
                                <span className="text-xs text-green-500 font-bold">Ended</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Generated $4.2k Revenue</span>
                                <span>2.8x ROI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
