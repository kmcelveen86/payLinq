"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getUserWalletDataCached, getAllUserTransactionsCached } from "@/lib/user-cache";

export async function getUserWalletData() {
    const { userId } = await auth();
    if (!userId) return null;

    return await getUserWalletDataCached(userId);
}

export async function getPaylinqUser() {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { clerkId: userId },
                { id: userId }
            ]
        },
        select: {
            id: true
        }
    });


    return user;
}

export async function getAllUserTransactions() {
    const { userId } = await auth();
    if (!userId) return [];

    return await getAllUserTransactionsCached(userId);
}
