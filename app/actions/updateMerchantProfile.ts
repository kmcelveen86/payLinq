"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export type MerchantProfileData = {
    name: string;
    website?: string | null;
    description?: string | null;
    integrationType: string;
    affiliateLink?: string | null;
    commissionRate?: number | string | null;
};

export async function updateMerchantProfile(formData: MerchantProfileData) {
    const { orgId } = await auth();

    if (!orgId) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const commissionRate = formData.commissionRate ? Number(formData.commissionRate) : 0;

        await prisma.merchant.update({
            where: {
                clerkOrgId: orgId,
            },
            data: {
                name: formData.name,
                website: formData.website,
                description: formData.description,
                integrationType: formData.integrationType,
                affiliateLink: formData.affiliateLink,
                commissionRate: isNaN(commissionRate) ? 0 : commissionRate,
            },
        });

        revalidatePath("/merchant/settings");
        return { success: true };
    } catch (error) {
        console.error("Error updating merchant profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}
