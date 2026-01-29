"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MerchantSettingsForm } from "./form";

export default async function MerchantSettingsPage() {
    const { orgId } = await auth();

    if (!orgId) {
        redirect("/merchant/onboarding");
    }

    const merchant = await prisma.merchant.findUnique({
        where: {
            clerkOrgId: orgId,
        },
    });

    if (!merchant) {
        return <div>Merchant not found. Please contact support.</div>;
    }

    return (
        <div className="container mx-auto max-w-4xl py-10 px-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your business profile and integration settings.
                </p>
            </div>

            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <MerchantSettingsForm merchant={merchant} />
            </div>
        </div>
    );
}
