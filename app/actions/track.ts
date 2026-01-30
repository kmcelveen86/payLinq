"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getPaylinqUser } from "@/app/actions/user";

export async function trackEvent(
    merchantId: string,
    type: string,
    metadata: Record<string, any> = {},
    source: string = "paylinq-app"
) {
    try {
        const user = await getPaylinqUser();
        const userId = user?.id;

        await prisma.analyticsEvent.create({
            data: {
                merchantId,
                type,
                userId: userId || null,
                source,
                metadata
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Tracking Error:", error);
        // Fail silently so we don't block UI
        return { success: false };
    }
}
