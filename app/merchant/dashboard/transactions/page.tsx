import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Box } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Marketplace/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Marketplace/components/ui/table";
import { Badge } from "@/components/Marketplace/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Marketplace/components/ui/button";

export default async function MerchantTransactionsPage() {
    const { orgId } = await auth();

    if (!orgId) redirect("/");

    const merchant = await prisma.merchant.findUnique({
        where: { clerkOrgId: orgId },
    });

    if (!merchant) redirect("/merchant/onboarding");

    // Fetch all transactions for this merchant
    const transactions = await prisma.paylinqTransaction.findMany({
        where: { merchantId: merchant.id },
        orderBy: { createdAt: "desc" },
        take: 500, // Limit to 500 for now
    });

    return (
        <Box className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/merchant/dashboard">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                    <p className="text-muted-foreground mt-2">Full history of customer purchases</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Transactions ({transactions.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>UPP Earned</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No transactions found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{new Date(tx.createdAt).toLocaleDateString()}</span>
                                                <span className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleTimeString()}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            {tx.id}
                                        </TableCell>
                                        <TableCell>
                                            {tx.userId ? (
                                                <span className="font-mono text-sm">{tx.userId}</span>
                                            ) : (
                                                <Badge variant="secondary">Guest</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: tx.currency }).format(tx.amount / 100)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-gold text-white hover:bg-gold/90 border-none">
                                                +{tx.uppEarned} UPP
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 dark:bg-green-950/30">
                                                Completed
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Box>
    );
}
