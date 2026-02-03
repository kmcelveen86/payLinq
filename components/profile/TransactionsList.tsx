"use client";

import React from "react";
import { ArrowLeft, ShoppingBag, Calendar, DollarSign, Award } from "lucide-react";
import Link from "next/link";
import { useUserTransactions } from "@/app/hooks/useProfile";

export default function TransactionsList({ initialTransactions }: { initialTransactions: any[] }) {
    const { data: liveTransactions } = useUserTransactions();
    const transactions = liveTransactions || initialTransactions;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <Link
                        href="/user/dashboard"
                        className="flex items-center text-gray-400 hover:text-white transition-colors mr-4"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                    </Link>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Transaction History
                    </h1>
                </div>

                {/* Transactions List */}
                <div className="space-y-4">
                    {transactions.length === 0 ? (
                        <div className="text-center py-20 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                            <ShoppingBag className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                            <h3 className="text-xl font-medium text-gray-300">No transactions yet</h3>
                            <p className="text-gray-500 mt-2">Your purchase history will appear here.</p>
                        </div>
                    ) : (
                        transactions.map((tx: any) => (
                            <div
                                key={tx.id}
                                className="group bg-gray-800/40 hover:bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 rounded-xl p-5 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                                    {/* Left: Merchant & Item Info */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/20 shrink-0">
                                            <ShoppingBag size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-100 group-hover:text-blue-300 transition-colors">
                                                {tx.merchant}
                                            </h3>
                                            <p className="text-sm text-gray-400 font-medium">
                                                {tx.itemName}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {tx.date}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${tx.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                    }`}>
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Amount & Rewards */}
                                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-1 md:gap-0 pl-14 md:pl-0">
                                        <div className="text-xl font-bold text-white flex items-center">
                                            <DollarSign size={16} className="text-gray-500 mr-0.5" />
                                            {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1 bg-gray-900/50 px-2 py-1 rounded-lg border border-gray-700/50">
                                            <Award size={14} className="text-[#C28F49]" />
                                            <span className="text-sm font-semibold bg-gradient-to-r from-[#C28F49] to-amber-500 bg-clip-text text-transparent">
                                                +{tx.points.toLocaleString()} UPP
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
