import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { requireRole, getAdminAuth } from "@/lib/admin-auth";
import { logAdminAction } from "@/lib/audit";
import { z } from "zod";

const suspendSchema = z.object({
    action: z.enum(["ban", "unban"]),
    reason: z.string().min(1, "Reason is required"),
});

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // await requireRole(["super_admin", "support"]);
        const { id } = await params;

        const body = await req.json();
        const { action, reason } = suspendSchema.parse(body);
        const { userId, email, role } = await getAdminAuth();

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const shouldBan = action === "ban";

        // Update DB
        const updated = await prisma.user.update({
            where: { id },
            data: {
                banned: shouldBan,
                bannedReason: shouldBan ? reason : null,
                bannedAt: shouldBan ? new Date() : null,
                bannedBy: shouldBan ? userId : null,
            },
        });

        // Sync with Clerk Metadata for Middleware Blocking
        if (user.clerkId) {
            try {
                const client = await clerkClient();
                await client.users.updateUserMetadata(user.clerkId, {
                    publicMetadata: {
                        banned: shouldBan,
                    },
                });

                // If banning, sign them out from all sessions?
                // client.sessions.revokeAllSessions(user.clerkId) is an option but might be too aggressive if we want them to see a "Banned" screen.
                // Middleware check is better.

            } catch (clerkError) {
                console.error("Failed to sync ban status to Clerk:", clerkError);
                // We don't fail the request, but we log it.
            }
        }

        // Audit Log
        await logAdminAction({
            adminId: userId || "unknown",
            adminEmail: email || "unknown",
            adminRole: role || "unknown",
            action: `user.${action}`,
            targetType: "user",
            targetId: id,
            details: { reason, previousState: user.banned, newState: shouldBan },
            ipAddress: req.headers.get("x-forwarded-for")
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Suspend User Error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update user status" }, { status: 500 });
    }
}
