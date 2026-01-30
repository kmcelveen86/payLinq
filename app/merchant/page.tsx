"use client";

import { Box } from "@mui/material";
import { ArrowRight, LayoutDashboard, Store, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Marketplace/components/ui/button";
import { SignInButton, SignedIn, SignedOut, useOrganization } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function MerchantDashboard() {
    const { organization, isLoaded } = useOrganization();
    console.log("🚀 ~ MerchantDashboard ~ organization:", organization)

    return (
        <div className="min-h-[calc(100vh-64px)] bg-background relative overflow-hidden flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-30 animate-pulse" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-gold/20 blur-[120px] rounded-full mix-blend-screen opacity-30 animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative max-w-4xl w-full"
            >
                <div className="bg-card/50 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                    {/* Brand Gradient Border Top */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-green-400 to-gold" />

                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="h-20 w-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center mb-8 border border-primary/20 shadow-lg shadow-primary/10"
                        >
                            <Store className="h-10 w-10 text-primary" />
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                            Merchant Portal
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Welcome to the next generation of commerce. <br className="hidden md:block" />
                            Manage your entire business from one beautiful command center.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
                        {/* Dashboard Card */}
                        <>
                            <SignedIn>
                                {isLoaded && organization && (
                                    <Link href="/dashboard" className="block h-full">
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="p-6 rounded-2xl bg-gradient-to-br from-white/50 to-white/10 dark:from-white/5 dark:to-transparent border border-white/20 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer group/card h-full"
                                        >
                                            <LayoutDashboard className="h-8 w-8 mb-4 text-primary group-hover/card:scale-110 transition-transform" />
                                            <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
                                                Dashboard
                                                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all text-primary" />
                                            </h3>
                                            <p className="text-muted-foreground">Detailed analytics, real-time transaction tracking, and insights.</p>
                                        </motion.div>
                                    </Link>
                                )}
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="p-6 rounded-2xl bg-gradient-to-br from-white/50 to-white/10 dark:from-white/5 dark:to-transparent border border-white/20 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer group/card h-full text-left"
                                    >
                                        <LayoutDashboard className="h-8 w-8 mb-4 text-primary group-hover/card:scale-110 transition-transform" />
                                        <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
                                            Dashboard
                                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all text-primary" />
                                        </h3>
                                        <p className="text-muted-foreground">Detailed analytics, real-time transaction tracking, and insights.</p>
                                    </motion.div>
                                </SignInButton>
                            </SignedOut>
                        </>

                        {/* Settings Card */}
                        <>
                            <SignedIn>
                                {isLoaded && organization && (
                                    <Link href="/settings" className="block h-full">
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="p-6 rounded-2xl bg-gradient-to-br from-white/50 to-white/10 dark:from-white/5 dark:to-transparent border border-white/20 dark:border-white/5 hover:border-gold/50 transition-all cursor-pointer group/card h-full"
                                        >
                                            <Store className="h-8 w-8 mb-4 text-gold group-hover/card:scale-110 transition-transform" />
                                            <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
                                                Store Settings
                                                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all text-gold" />
                                            </h3>
                                            <p className="text-muted-foreground">Customize your public profile, rewards, and integration preferences.</p>
                                        </motion.div>
                                    </Link>
                                )}
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal" forceRedirectUrl="/settings">
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="p-6 rounded-2xl bg-gradient-to-br from-white/50 to-white/10 dark:from-white/5 dark:to-transparent border border-white/20 dark:border-white/5 hover:border-gold/50 transition-all cursor-pointer group/card h-full text-left"
                                    >
                                        <Store className="h-8 w-8 mb-4 text-gold group-hover/card:scale-110 transition-transform" />
                                        <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
                                            Store Settings
                                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all text-gold" />
                                        </h3>
                                        <p className="text-muted-foreground">Customize your public profile, rewards, and integration preferences.</p>
                                    </motion.div>
                                </SignInButton>
                            </SignedOut>
                        </>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <SignedIn>
                            <Link href="/dashboard" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto min-w-[200px] h-14 text-lg font-medium rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                                >
                                    Get Started
                                </Button>
                            </Link>
                        </SignedIn>
                        <SignedOut>
                            <div className="w-full sm:w-auto">
                                <SignInButton mode="modal">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto min-w-[200px] h-14 text-lg font-medium rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                                    >
                                        Get Started
                                    </Button>
                                </SignInButton>
                            </div>
                        </SignedOut>
                        <Link href="https://getpaylinq.com" target="_blank" className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto min-w-[200px] h-14 text-lg font-medium rounded-xl border-2 hover:bg-secondary/50"
                            >
                                Learn More
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
