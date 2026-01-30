import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box } from "@mui/material";
import { OrganizationSwitcher, UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import MerchantMobileMenu from "@/components/MerchantMobileMenu";

// We can reuse the main font or pick a new one. sticking to Inter for now.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PayLinq Merchant",
    description: "Merchant Portal for PayLinq",
};

// ... existing code ...

import { auth } from "@clerk/nextjs/server";

// ...

export default async function MerchantLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { orgId } = await auth();

    return (
        <Box className={`merchant-layout min-h-screen bg-background ${inter.className}`}>
            {/* Simple Merchant Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl tracking-tight flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logos/paylinq-logo-new.png"
                                alt="PayLinq"
                                width={32}
                                height={32}
                                className="object-contain" // Keeping it simple, assuming icon-like dimensions
                            />
                            <span className="text-primary hidden sm:inline-block">PayLinq</span>
                        </Link>
                        <span className="text-muted-foreground font-normal text-lg">|</span>
                        <span className="text-foreground">Merchant</span>
                    </div>

                    {orgId && (
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                            <Link href="/settings" className="text-sm font-medium hover:text-primary transition-colors">Settings</Link>
                        </nav>
                    )}

                    <div className="flex items-center gap-4">
                        <SignedIn>
                            <div className="hidden md:flex items-center gap-4">
                                <OrganizationSwitcher
                                    afterCreateOrganizationUrl="/dashboard"
                                    afterLeaveOrganizationUrl="/dashboard"
                                    afterSelectOrganizationUrl="/dashboard"
                                    afterSelectPersonalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || "https://getpaylinq.com"}/user/dashboard`}
                                    appearance={{
                                        elements: {
                                            organizationSwitcherTrigger: "py-2 px-3 border border-border rounded-md hover:bg-secondary/50 transition-colors"
                                        }
                                    }}
                                />
                                <UserButton />
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="hidden md:block text-sm font-medium hover:text-primary transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>

                        {/* Mobile Menu */}
                        <MerchantMobileMenu />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {children}
            </main>
        </Box>
    );
}
