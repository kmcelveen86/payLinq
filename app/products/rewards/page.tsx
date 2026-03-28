"use client";

import React from "react";
import { motion } from "framer-motion";
import TopNavComp from "@/components/TopNav/TopNavComp";
import PaylinqFooter from "@/components/PaylinqFooter";
import { WOW_POINTS_TABLE } from "@/lib/rewards";
import {
    Plane,
    ShoppingBag,
    Utensils,
    Film,
    Home,
    BookOpen,
    Car,
    Gift,
    Coffee,
    Zap
} from "lucide-react";

// Helper to map categories to icons
const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("flight") || cat.includes("travel")) return <Plane className="w-6 h-6 text-white" />;
    if (cat.includes("shop") || cat.includes("apparel") || cat.includes("luxury")) return <ShoppingBag className="w-6 h-6 text-white" />;
    if (cat.includes("food") || cat.includes("restaurant") || cat.includes("dining")) return <Utensils className="w-6 h-6 text-white" />;
    if (cat.includes("movie") || cat.includes("event")) return <Film className="w-6 h-6 text-white" />;
    if (cat.includes("home") || cat.includes("furniture")) return <Home className="w-6 h-6 text-white" />;
    if (cat.includes("book")) return <BookOpen className="w-6 h-6 text-white" />;
    if (cat.includes("car") || cat.includes("ride")) return <Car className="w-6 h-6 text-white" />;
    if (cat.includes("coffee")) return <Coffee className="w-6 h-6 text-white" />;
    if (cat.includes("gift") || cat.includes("toy")) return <Gift className="w-6 h-6 text-white" />;
    return <Zap className="w-6 h-6 text-white" />;
};

// Helper to format category name
const formatCategoryName = (key: string) => {
    return key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export default function RewardsBreakdownPage() {
    // Convert table to array for mapping, sorted by points (descending)
    const rewardsList = Object.entries(WOW_POINTS_TABLE).sort(([, a], [, b]) => b - a);

    return (
        <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100">
            <TopNavComp />

            <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-6"
                    >
                        WOW Rewards Breakdown
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-400 max-w-2xl mx-auto"
                    >
                        Explore our fixed-point rewards system. Earn massive points for every transaction in these categories, regardless of spend amount.
                    </motion.p>
                </div>

                {/* Rewards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rewardsList.map(([key, points], index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-green-500/50 hover:bg-neutral-800/80 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 group-hover:from-green-500 group-hover:to-emerald-500 transition-colors duration-300">
                                    {getCategoryIcon(key)}
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-200 group-hover:text-white">
                                    {formatCategoryName(key)}
                                </h3>
                            </div>

                            <div className="flex items-baseline justify-between">
                                <span className="text-sm text-neutral-500 uppercase tracking-wider font-medium">Points Earned</span>
                                <span className="text-2xl font-bold text-green-400 group-hover:text-green-300">
                                    {points.toLocaleString()} <span className="text-sm font-normal text-neutral-400">pts</span>
                                </span>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center text-neutral-500 text-sm"
                >
                    <p>Points are awarded per transaction. Categories are subject to merchant classification codes (MCC).</p>
                </motion.div>
            </main>

            <PaylinqFooter />
        </div>
    );
}
