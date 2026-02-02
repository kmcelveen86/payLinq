import { prisma } from "@/lib/prisma";

export interface AuditLogParams {
    adminId: string;
    adminEmail: string;
    adminRole: string;
    action: string;       // e.g., "merchant.suspend", "merchant.rate_update"
    targetType: string;   // "merchant", "user", "conversion"
    targetId: string;
    details: Record<string, any>;
    ipAddress?: string | null;
}

export async function logAdminAction(params: AuditLogParams) {
    try {
        await prisma.adminAuditLog.create({
            data: {
                adminId: params.adminId,
                adminEmail: params.adminEmail,
                adminRole: params.adminRole,
                action: params.action,
                targetType: params.targetType,
                targetId: params.targetId,
                details: params.details,
                ipAddress: params.ipAddress,
            },
        });
    } catch (error) {
        console.error("Failed to write audit log:", error);
        // We don't throw here to avoid failing the main action, but in strict systems we might.
    }
}
