"use client";

import { Box, Typography, Button } from "@mui/material";
import { ArrowRight, LayoutDashboard, Store } from "lucide-react";
import Link from "next/link";

export default function MerchantDashboard() {
    return (
        <Box className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-background text-foreground p-4 md:p-8">
            <div className="bg-card border border-border rounded-xl p-6 md:p-10 max-w-2xl w-full text-center shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>

                <div className="flex justify-center mb-6 md:mb-8">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Store className="h-8 w-8 text-primary" />
                    </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight">
                    Merchant Portal
                </h1>

                <p className="text-muted-foreground mb-12 md:mb-16 text-base md:text-lg">
                    {`Welcome to the new merchant experience. Manage your transactions, customers, and business settings from one central hub.`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
                    <div className="p-4 md:p-6 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors">
                        <LayoutDashboard className="h-6 w-6 mb-2 md:mb-3 text-primary mx-auto md:mx-0" />
                        <h3 className="font-semibold mb-1 md:mb-2 text-lg">Dashboard</h3>
                        <p className="text-sm text-muted-foreground">{`View real-time analytics`}</p>
                    </div>
                    <div className="p-4 md:p-6 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors">
                        <Store className="h-6 w-6 mb-2 md:mb-3 text-primary mx-auto md:mx-0" />
                        <h3 className="font-semibold mb-1 md:mb-2 text-lg">Store Settings</h3>
                        <p className="text-sm text-muted-foreground">{`Manage profile & brand`}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-4">
                    <Link href="/dashboard" className="w-full sm:w-auto">
                        <Button
                            variant="contained"
                            size="large"
                            className="bg-primary hover:bg-primary/90 text-white font-medium px-6 md:px-8 py-3 rounded-lg normal-case text-base w-full"
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Button
                        variant="outlined"
                        size="large"
                        className="border-input hover:bg-secondary hover:text-foreground text-muted-foreground normal-case px-6 md:px-8 py-3 text-base w-full sm:w-auto"
                    >
                        Learn More
                    </Button>
                </div>
            </div>
        </Box>
    );
}
