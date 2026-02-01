"use server";

import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest } from "next/server"; // Import for type usage if needed, but actions usually don't use NextRequest directly like this.
// Actually, for actions, we just use clerk's auth() or getAuth() with a request object if passed, but usually auth() is easier in server components/actions.
import { auth } from "@clerk/nextjs/server";

export async function getUserSubscription() {
    try {
        const { userId: clerkId } = await auth();

        if (!clerkId) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: { clerkId },
            select: {
                membershipTier: true,
                billingCycle: true,
            }
        });

        if (!user) {
            return null;
        }

        return {
            tier: user.membershipTier || null,
            interval: user.billingCycle || "monthly"
        };

    } catch (error) {
        console.error("Error fetching user subscription:", error);
        return null;
    }
}
