import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminRole, PERMISSIONS } from "./admin-permissions";

export { PERMISSIONS };
export type { AdminRole };

// ...

export async function getAdminAuth() {
    const session = await auth();
    const user = await currentUser();

    if (!session.userId || !user) {
        return { userId: null, role: null, email: null };
    }

    // Check Session Claims (Fastest)
    let role = (session.sessionClaims?.metadata as any)?.adminRole as AdminRole | undefined;

    // Fallback: Check User Object from API (slower but reliable if token is stale)
    if (!role && user) {
        role = (user.publicMetadata as any)?.adminRole as AdminRole | undefined;
    }

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
