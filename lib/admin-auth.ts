import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type AdminRole = "super_admin" | "support" | "analyst";

export const PERMISSIONS = {
    VIEW_DASHBOARD: ["super_admin", "support", "analyst"],
    MANAGE_MERCHANTS: ["super_admin", "support"],
    MANAGE_CUSTOMERS: ["super_admin", "support"],
    MANAGE_UPP: ["super_admin"],
    MANAGE_ADMINS: ["super_admin"],
    IMPERSONATE_USER: ["super_admin"],
};

// ...

export async function getAdminAuth() {
    const session = await auth();
    const user = await currentUser();

    if (!session.userId || !user) {
        return { userId: null, role: null, email: null };
    }

    // TODO: Fetch user metadata properly if not in session claims
    // For now, using a mocked role or session claim if configured
    const role = (session.sessionClaims?.metadata as any)?.adminRole as AdminRole | undefined;

    return {
        userId: session.userId,
        role: role || null,
        email: user.primaryEmailAddress?.emailAddress || null
    };
}

export async function requireRole(allowedRoles: AdminRole[]) {
    const { role } = await getAdminAuth();

    // Temporary Dev Bypass: Check environment variable or special user
    // const isAdmin = process.env.ADMIN_EMAILS?.includes(...) 

    if (!role || !allowedRoles.includes(role)) {
        // Check if we are in a text/json context or page context?
        // For API routes, we might want to throw or return Response
        // For Pages, redirect
        // We'll throw an Error that can be caught by error.tsx or wrapped
        throw new Error("Unauthorized: Insufficient permissions");
    }
}
