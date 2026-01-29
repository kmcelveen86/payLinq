"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(merchantId: string) {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Check if user exists in our local DB
        const user = await prisma.user.findUnique({ where: { clerkId } });

        if (!user) {
            return { success: false, error: "User not found in database" };
        }

        // Find existing favorite using internal user ID
        const existingFavorite = await prisma.merchantFavorite.findUnique({
            where: {
                userId_merchantId: {
                    userId: user.id,
                    merchantId,
                },
            },
        });

        if (existingFavorite) {
            // Remove favorite
            await prisma.merchantFavorite.delete({
                where: {
                    id: existingFavorite.id,
                },
            });
            revalidatePath("/merchant/" + merchantId);
            return { success: true, favorited: false };
        } else {
            // Add favorite
            await prisma.merchantFavorite.create({
                data: {
                    userId: user.id, // Use internal ID
                    merchantId,
                },
            });
            revalidatePath("/merchant/" + merchantId);
            return { success: true, favorited: true };
        }
    } catch (error) {
        console.error("Error toggling favorite:", error);
        return { success: false, error: "Failed to toggle favorite" };
    }
}
