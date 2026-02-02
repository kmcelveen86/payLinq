"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import LoadingComp from "./LoadingComp";
import AccessDeniedTrap from "./AccessDeniedTrap";
import { logSecurityEvent } from "@/app/actions/security";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    // Capture reference to log once per mount/denial
    const loggedRef = useRef(false);

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            router.push("/sign-in");
            return;
        }

        const role = user?.publicMetadata?.adminRole;
        if (role === "super_admin" || role === "support") {
            setAuthorized(true);
        } else {
            // Unauthorized - Log it!
            // Use ref to ensure we only log once per mount, even if deps change
            if (!loggedRef.current) {
                loggedRef.current = true;

                // Call server action to log
                logSecurityEvent({
                    userId: user.id,
                    userEmail: user.primaryEmailAddress?.emailAddress || "unknown",
                    path: pathname,
                    action: "UNAUTHORIZED_ADMIN_ACCESS_ATTEMPT",
                    userAgent: window.navigator.userAgent
                }).catch(err => {
                    console.error("Log failed", err);
                    // If log failed, maybe allow retry? For now, keep it true to prevent spam.
                });
            }
        }
    }, [isLoaded, isSignedIn, user, router, pathname]);

    if (!isLoaded) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-100">
                <LoadingComp />
            </div>
        );
    }

    if (!authorized) {
        // TRAP!
        return <AccessDeniedTrap />;
    }

    return <>{children}</>;
}
