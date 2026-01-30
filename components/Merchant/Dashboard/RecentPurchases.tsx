"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Marketplace/components/ui/card";
import { Button } from "@/components/Marketplace/components/ui/button";
import { ArrowUpRight, DollarSign, Gift } from "lucide-react";
import Link from "next/link";
import { PaylinqTransaction } from "@prisma/client";

// Define a type that includes the necessary fields, incase we pass mapped data
interface TransactionDisplay {
    id: string;
    amount: number; // In dollars
    uppEarned: number;
    currency: string;
    createdAt: Date;
    userId?: string | null;
}

interface RecentPurchasesProps {
    transactions: TransactionDisplay[];
}

export function RecentPurchases({ transactions }: RecentPurchasesProps) {
    // Take top 5-10 just to be safe, though parent should control limits
    const displayTransactions = transactions.slice(0, 10);

    return (
        <Card className="col-span-1 md:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Recent Purchases</CardTitle>
                <Link href="/merchant/dashboard/transactions">
                    <Button variant="ghost" size="sm" className="gap-1">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {displayTransactions.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No transactions yet.</p>
                    ) : (
                        displayTransactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: tx.currency }).format(tx.amount)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(tx.createdAt).toLocaleDateString()} • {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-sm font-medium text-gold">
                                            <Gift className="h-3 w-3" />
                                            +{tx.uppEarned} UPP
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            User: {tx.userId ? tx.userId.slice(0, 8) + "..." : "Guest"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
