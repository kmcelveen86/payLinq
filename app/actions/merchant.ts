"use server";

import { auth } from "@clerk/nextjs/server";
import { createMerchantApiKey, listMerchantApiKeys, revokeMerchantApiKey } from "@/lib/api-keys";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMerchantId() {
    const { orgId } = await auth();
    if (!orgId) throw new Error("Unauthorized");

    const merchant = await prisma.merchant.findUnique({
        where: { clerkOrgId: orgId },
    });

    if (!merchant) throw new Error("Merchant not found");
    return merchant.id;
}

export async function generateApiKey(name: string) {
    const merchantId = await getMerchantId();
    const result = await createMerchantApiKey(merchantId, name);
    revalidatePath("/merchant/developers");
    return result;
}

export async function getApiKeys() {
    const merchantId = await getMerchantId();
    return await listMerchantApiKeys(merchantId);
}

export async function revokeApiKey(keyId: string) {
    const merchantId = await getMerchantId();
    await revokeMerchantApiKey(merchantId, keyId);
    revalidatePath("/merchant/developers");
}

// Webhooks
export async function listWebhooks() {
    const merchantId = await getMerchantId();
    return await prisma.webhookSubscriber.findMany({
        where: { merchantId },
        orderBy: { createdAt: "desc" },
    });
}

export async function createWebhook(url: string, events: string[]) {
    const merchantId = await getMerchantId();
    const secret = "whsec_" + Math.random().toString(36).substring(2, 15); // Simple secret gen

    await prisma.webhookSubscriber.create({
        data: {
            merchantId,
            url,
            events,
            secret,
        },
    });
    revalidatePath("/merchant/developers");
}

export async function deleteWebhook(id: string) {
    const merchantId = await getMerchantId();
    await prisma.webhookSubscriber.deleteMany({
        where: { id, merchantId },
    });
    revalidatePath("/merchant/developers");
}
