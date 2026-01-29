"use client";

import { CreateOrganization, OrganizationSwitcher } from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";

export default function MerchantOnboarding() {
    return (
        <Box className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 bg-background">
            <div className="max-w-3xl w-full text-center mb-8">
                <Typography variant="h1" className="text-3xl font-bold mb-4 tracking-tight">
                    Setup Your Merchant Account
                </Typography>
                <Typography variant="body1" className="text-muted-foreground text-lg">
                    Create an organization to manage your business, team, and rewards.
                </Typography>
            </div>

            <div className="flex flex-col items-center gap-3 mb-8 w-full max-w-lg">
                <Typography className="text-sm font-medium text-muted-foreground">
                    Already have a business? Switch to it:
                </Typography>
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/dashboard"
                    afterSelectOrganizationUrl="/dashboard"
                    afterSelectPersonalUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard`}
                    appearance={{
                        elements: {
                            rootBox: "w-full flex justify-center",
                            organizationSwitcherTrigger: "w-full justify-center border border-border py-2 rounded-lg hover:bg-muted/50 transition-all"
                        }
                    }}
                />

                <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard`} className="text-sm text-primary hover:underline mt-2">
                    &larr; Back to Personal Dashboard
                </a>
            </div>

            <div className="relative w-full max-w-lg mb-8 flex items-center justify-center">
                <div className="absolute w-full h-px bg-border"></div>
                <span className="relative bg-background px-3 text-xs uppercase text-muted-foreground font-semibold">
                    Or Create New
                </span>
            </div>

            <CreateOrganization
                afterCreateOrganizationUrl="/dashboard"
                appearance={{
                    elements: {
                        rootBox: "w-full max-w-lg mx-auto",
                        card: "shadow-xl border border-border"
                    }
                }}
            />
        </Box>
    );
}
