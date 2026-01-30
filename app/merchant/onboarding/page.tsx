"use client";

import { OrganizationList, useOrganization } from "@clerk/nextjs";
import { Store, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Marketplace/components/ui/button";

export default function MerchantOnboarding() {
    const { organization, isLoaded } = useOrganization();

    return (
        <div className="min-h-[calc(100vh-64px)] bg-background relative overflow-x-hidden flex flex-col items-center justify-center p-0 sm:p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 blur-[100px] rounded-full mix-blend-screen opacity-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gold/10 blur-[100px] rounded-full mix-blend-screen opacity-40 animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">

                {/* Left Side: Context & Value Prop */}
                <div className="text-center lg:text-left space-y-8 px-4 sm:px-0">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            <Store className="h-4 w-4" />
                            <span>Merchant Portal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                            Setup Your Business <br /> in Seconds
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Create an organization to start accepting payments, managing rewards, and growing your customer base.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="p-4 rounded-xl bg-card border border-border/50 shadow-sm">
                            <TrendingUp className="h-6 w-6 text-gold mb-2" />
                            <h3 className="font-semibold text-foreground">Analytics</h3>
                            <p className="text-sm text-muted-foreground">Real-time insights on your sales.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-card border border-border/50 shadow-sm">
                            <ShieldCheck className="h-6 w-6 text-primary mb-2" />
                            <h3 className="font-semibold text-foreground">Secure</h3>
                            <p className="text-sm text-muted-foreground">Enterprise-grade security built-in.</p>
                        </div>
                    </div>

                    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL || "https://getpaylinq.com"}/user/dashboard`}>
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                            &larr; Back to Personal Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Right Side: Clerk Components */}
                <div className="bg-card/50 backdrop-blur-xl border-y sm:border border-white/10 dark:border-white/5 sm:rounded-3xl w-full sm:mx-auto px-4 py-8 sm:px-8 shadow-none sm:shadow-2xl space-y-8 max-w-lg overflow-hidden">
                    <OrganizationList
                        afterCreateOrganizationUrl="/merchant/dashboard"
                        afterSelectOrganizationUrl="/merchant/dashboard"
                        afterSelectPersonalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || "https://getpaylinq.com"}/user/dashboard`}
                        hidePersonal={false}
                        appearance={{
                            elements: {
                                rootBox: "w-full max-w-full box-border",
                                card: "shadow-none border-none bg-transparent w-full max-w-full box-border",
                                scrollBox: "w-full max-w-full",
                                navbar: "hidden",
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
