import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { getAdminAuth } from "@/lib/admin-auth";

export default async function ConversionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Basic auth check (or rely on layout/middleware)
    const { userId } = await getAdminAuth();
    if (!userId) {
        // Handle redirect or error if needed, though client guard usually handles this
    }

    const { id } = await params;

    const conversion = await prisma.paylinqTransaction.findUnique({
        where: { id },
        include: {
            user: true,
            merchant: true,
            walletTransaction: true,
        },
    });

    if (!conversion) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/conversions" className="text-sm text-blue-600 hover:underline mb-2 block">
                        &larr; Back to Conversions
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Conversion Details</h1>
                    <p className="text-gray-500">ID: {conversion.id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Transaction Details */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Transaction Info</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Amount</dt>
                            <dd className="text-lg font-semibold text-gray-900">
                                {(conversion.amount / 100).toLocaleString("en-US", { style: "currency", currency: conversion.currency })}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${conversion.status === "COMPLETED" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                    {conversion.status}
                                </span>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Date</dt>
                            <dd className="text-sm text-gray-900">{format(conversion.createdAt, "PPP pp")}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Type</dt>
                            <dd className="text-sm text-gray-900 capitalize">{conversion.walletTransaction?.type || "Purchase"}</dd>
                        </div>
                    </dl>
                </div>

                {/* Rewards Info */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">UPP Rewards</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">UPP Earned</dt>
                            <dd className="text-2xl font-bold text-blue-600">{conversion.uppEarned.toFixed(2)}</dd>
                        </div>
                        {conversion.walletTransaction && (
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Wallet Trx ID</dt>
                                <dd className="text-xs font-mono text-gray-600 break-all">{conversion.walletTransaction.id}</dd>
                            </div>
                        )}
                    </dl>
                </div>

                {/* User Info */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">User</h3>
                    <dl className="space-y-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                            <dd className="text-sm text-gray-900">{conversion.user.firstName} {conversion.user.lastName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="text-sm text-gray-900">{conversion.user.email}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">User ID</dt>
                            <dd className="text-xs font-mono text-gray-500">{conversion.user.id}</dd>
                        </div>
                        <div className="mt-4">
                            <Link href={`/customers/${conversion.user.id}`} className="text-sm text-blue-600 hover:underline">
                                View Customer Profile &rarr;
                            </Link>
                        </div>
                    </dl>
                </div>

                {/* Merchant Info */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Merchant</h3>
                    <dl className="space-y-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Business Name</dt>
                            <dd className="text-sm text-gray-900">{conversion.merchant.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Category</dt>
                            <dd className="text-sm text-gray-900">{conversion.merchant.category || "N/A"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Merchant ID</dt>
                            <dd className="text-xs font-mono text-gray-500">{conversion.merchant.id}</dd>
                        </div>
                        <div className="mt-4">
                            <Link href={`/merchants/${conversion.merchant.id}`} className="text-sm text-blue-600 hover:underline">
                                View Merchant Profile &rarr;
                            </Link>
                        </div>
                    </dl>
                </div>
            </div>

            {/* Raw JSON Data (Collapsible/Dev only?) */}
            <details className="bg-gray-50 p-4 rounded text-xs border">
                <summary className="cursor-pointer font-medium text-gray-500 mb-2">Raw Data Output</summary>
                <pre className="overflow-auto text-gray-800">{JSON.stringify(conversion, null, 2)}</pre>
            </details>
        </div>
    );
}
