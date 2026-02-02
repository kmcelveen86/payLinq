"use server";

import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";


export async function logSecurityEvent(data: {
    userId: string;
    userEmail: string;
    ipAddress?: string;
    userAgent?: string;
    path: string;
    action?: string;
}) {
    try {
        // We receive the Clerk ID as 'userId' from the client
        // But we need the internal Prisma ID for the relation
        const user = await prisma.user.findUnique({
            where: { clerkId: data.userId },
            select: { id: true }
        });

        if (!user) {
            console.error(`Security Log Failed: User with Clerk ID ${data.userId} not found in DB.`);
            return;
        }

        await prisma.securityLog.create({
            data: {
                userId: user.id, // Use the resolved internal ID
                userEmail: data.userEmail,
                ipAddress: data.ipAddress,
                userAgent: data.userAgent,
                path: data.path,
                action: data.action || "UNAUTHORIZED_ADMIN_ACCESS",
            },
        });
    } catch (error) {
        console.error("Failed to log security event:", error);
        // Silent fail to not disrupt flow, but log to console
    }
}

import { getAdminAuth } from "@/lib/admin-auth";
export async function revokeUserSession(userId: string) {
    const { role } = await getAdminAuth();

    if (role !== "super_admin") {
        throw new Error("Unauthorized");
    }

    try {
        const client = await clerkClient();

        // 1. Lookup User to get Clerk ID
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { clerkId: true }
        });

        if (!user || !user.clerkId) {
            // If user not found or no Clerk ID, we can't revoke Clerk sessions
            console.warn(`Cannot revoke session: User ${userId} has no Clerk ID`);
            return { success: false, error: "User not linked to Clerk" };
        }

        const sessions = await client.sessions.getSessionList({ userId: user.clerkId, status: "active" });

        await Promise.all(
            sessions.data.map(session => client.sessions.revokeSession(session.id))
        );

        return { success: true, count: sessions.data.length };
    } catch (error) {
        console.error("Failed to revoke session:", error);
        throw new Error("Failed to revoke session");
    }
}

export async function banUser(userId: string) {
    const { role } = await getAdminAuth();

    if (role !== "super_admin") {
        throw new Error("Unauthorized");
    }

    try {
        const client = await clerkClient();

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, clerkId: true }
        });

        if (!user || !user.clerkId) {
            throw new Error("User not found or no Clerk ID");
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                banned: true,
                bannedAt: new Date(),
                bannedBy: "SUPER_ADMIN",
                bannedReason: "Security Violation - Admin Portal Attempt"
            }
        });

        await client.users.banUser(user.clerkId);

        return { success: true };

    } catch (error) {
        console.error("Failed to ban user:", error);
        throw new Error("Failed to ban user");
    }
}

export async function deleteSecurityLogs(logIds: string[]) {
    const { role } = await getAdminAuth();

    if (role !== "super_admin") {
        throw new Error("Unauthorized");
    }

    try {
        await prisma.securityLog.deleteMany({
            where: {
                id: {
                    in: logIds,
                },
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to delete security logs:", error);
        throw new Error("Failed to delete security logs");
    }
}
