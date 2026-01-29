import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box } from "@mui/material";
import { OrganizationSwitcher, UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

// We can reuse the main font or pick a new one. sticking to Inter for now.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PayLinq Merchant",
    description: "Merchant Portal for PayLinq",
};

export default function MerchantLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box className={`merchant-layout min-h-screen bg-background ${inter.className}`}>
            {/* Simple Merchant Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl tracking-tight flex items-center gap-3">
                        <span className="text-primary">PayLinq</span>
                        <span className="text-muted-foreground font-normal">|</span>
                        <span className="text-foreground">Merchant</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
                        <a href="/settings" className="text-sm font-medium hover:text-primary transition-colors">Settings</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <SignedIn>
                            <OrganizationSwitcher
                                afterCreateOrganizationUrl="/dashboard"
                                afterLeaveOrganizationUrl="/dashboard"
                                afterSelectOrganizationUrl="/dashboard"
                                afterSelectPersonalUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard`}
                                appearance={{
                                    elements: {
                                        organizationSwitcherTrigger: "py-2 px-3 border border-border rounded-md hover:bg-secondary/50 transition-colors"
                                    }
                                }}
                            />
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-medium hover:text-primary transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {children}
            </main>
        </Box>
    );
}
