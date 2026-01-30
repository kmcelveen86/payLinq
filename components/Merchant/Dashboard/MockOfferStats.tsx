"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Marketplace/components/ui/card";
import { MousePointerClick, Ticket, Percent } from "lucide-react";

export function MockOfferStats() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Offer Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Views */}
                <div className="flex items-start md:flex-col xl:flex-row md:items-start xl:items-center gap-4 md:gap-3 xl:gap-4">
                    <div className="p-3 md:p-2 xl:p-3 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
                        <MousePointerClick className="h-5 w-5 md:h-4 md:w-4 xl:h-5 xl:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Views</p>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <p className="text-3xl md:text-2xl xl:text-3xl font-bold text-foreground">2,543</p>
                            <span className="text-[10px] font-semibold bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full whitespace-nowrap">
                                +8%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-border/50" />

                {/* Redemptions */}
                <div className="flex items-start md:flex-col xl:flex-row md:items-start xl:items-center gap-4 md:gap-3 xl:gap-4">
                    <div className="p-3 md:p-2 xl:p-3 bg-purple-500/10 rounded-xl text-purple-500 shrink-0">
                        <Ticket className="h-5 w-5 md:h-4 md:w-4 xl:h-5 xl:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Redemptions</p>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <p className="text-3xl md:text-2xl xl:text-3xl font-bold text-foreground">342</p>
                            <span className="text-[10px] font-semibold bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full whitespace-nowrap">
                                +12%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-border/50" />

                {/* Conversion */}
                <div className="flex items-start md:flex-col xl:flex-row md:items-start xl:items-center gap-4 md:gap-3 xl:gap-4">
                    <div className="p-3 md:p-2 xl:p-3 bg-orange-500/10 rounded-xl text-orange-500 shrink-0">
                        <Percent className="h-5 w-5 md:h-4 md:w-4 xl:h-5 xl:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Conversion</p>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <p className="text-3xl md:text-2xl xl:text-3xl font-bold text-foreground">13.4%</p>
                            <span className="text-[10px] font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-full whitespace-nowrap">
                                Stable
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
