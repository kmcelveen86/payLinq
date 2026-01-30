"use client";

import { CreateOrganization, OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { Store, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Marketplace/components/ui/button";

export default function MerchantOnboarding() {
    const { organization, isLoaded } = useOrganization();
    console.log("🚀 ~ MerchantOnboarding ~ organization:", organization)

    return (
        <div className="min-h-[calc(100vh-64px)] bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 blur-[100px] rounded-full mix-blend-screen opacity-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gold/10 blur-[100px] rounded-full mix-blend-screen opacity-40 animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">

                {/* Left Side: Context & Value Prop */}
                <div className="text-center lg:text-left space-y-8">
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
                <div className="bg-card/50 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8 max-w-md mx-auto w-full">

                    <div className="space-y-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-muted-foreground mb-3">Switch Organization</p>
                            <OrganizationSwitcher
                                afterCreateOrganizationUrl="/dashboard"
                                afterSelectOrganizationUrl="/dashboard"
                                afterSelectPersonalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || "https://getpaylinq.com"}/user/dashboard`}
                                appearance={{
                                    elements: {
                                        rootBox: "w-full flex justify-center",
                                        organizationSwitcherTrigger: "w-full justify-center border border-input py-2.5 rounded-xl hover:bg-muted/50 transition-all text-foreground"
                                    }
                                }}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <CreateOrganization
                                afterCreateOrganizationUrl="/dashboard"
                                appearance={{
                                    elements: {
                                        rootBox: "w-full",
                                        card: "shadow-none border-none p-0 w-full bg-transparent gap-4",
                                        headerTitle: "text-xl font-bold text-center text-foreground",
                                        headerSubtitle: "text-center text-muted-foreground mb-4",
                                        formButtonPrimary: "bg-primary hover:bg-primary/90 rounded-xl h-11",
                                        formFieldInput: "rounded-xl h-11 border-input bg-background"
                                    }
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
