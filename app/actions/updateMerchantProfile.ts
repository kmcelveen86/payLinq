"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export type MerchantProfileData = {
    name: string;
    website: string;
    description: string;
    integrationType: string;
    affiliateLink: string;
    commissionRate: number;
};

export async function updateMerchantProfile(formData: MerchantProfileData) {
    const { orgId } = await auth();

    if (!orgId) {
        return { success: false, error: "Unauthorized" };
    }

    try {
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
                commissionRate: Number(formData.commissionRate),
            },
        });

        revalidatePath("/merchant/settings");
        return { success: true };
    } catch (error) {
        console.error("Error updating merchant profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}
