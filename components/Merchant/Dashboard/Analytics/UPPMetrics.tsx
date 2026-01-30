"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Marketplace/components/ui/card";
import { Coins, Zap, Trophy } from "lucide-react";

export function UPPMetrics() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="text-lg font-medium">UPP Tokenomics</CardTitle>
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
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">142,500</span>
                        <span className="text-xs text-muted-foreground">Tokens</span>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                        <span className="text-green-500 font-medium">+15k</span> this month
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Avg per Tx */}
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                        <div className="flex items-center gap-3">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Avg UPP / Tx</span>
                        </div>
                        <span className="font-bold">120 UPP</span>
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
