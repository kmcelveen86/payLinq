"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function getMerchants() {
    try {
        const { userId: clerkUserId } = await auth();
        let internalUserId: string | null = null;

        if (clerkUserId) {
            const user = await prisma.user.findUnique({
                where: { clerkId: clerkUserId },
                select: { id: true }
            });
            internalUserId = user?.id || null;
        }

        const merchants = await prisma.merchant.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                favoritedBy: {
                    where: {
                        userId: internalUserId ?? "",
                    }
                }
            }
        });

        // Transform to add isFavorited boolean
        return merchants.map(m => ({
            ...m,
            isFavorited: m.favoritedBy.length > 0,
            favoritedBy: undefined // clean up
        }));
    } catch (error) {
        console.error("Error fetching merchants:", error);
        return [];
    }
}
