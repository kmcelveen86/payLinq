"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MerchantSettingsForm } from "./form";

export default async function MerchantSettingsPage() {
    const { orgId } = await auth();

    if (!orgId) {
        redirect("/");
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
        <div className="container mx-auto max-w-5xl py-8 px-4 sm:px-6">
            <div className="mb-8 space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
                <p className="text-muted-foreground text-lg">
                    Manage your business profile and integration settings.
                </p>
            </div>

            <MerchantSettingsForm merchant={merchant} />
        </div>
    );
}
