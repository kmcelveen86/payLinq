"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Client-side Ban Guard
// This replaces the middleware ban check as requested.
export default function BanGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoaded } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded || !user) return;

        // Check if banned
        const isBanned = user.publicMetadata?.banned === true;

        if (isBanned && pathname !== "/banned") {
            router.replace("/banned");
        }

        // Optional: If NOT banned but on /banned, redirect to dashboard?
        // if (!isBanned && pathname === "/banned") router.replace("/dashboard");

    }, [isLoaded, user, pathname, router]);

    // Don't render children if banned and not on banned page?
    // Or just let it flash and redirect. 
    // To prevent flash of content, we can return null if banned && pathname !== '/banned'

    if (isLoaded && user?.publicMetadata?.banned === true && pathname !== "/banned") {
        return null; // or a loading spinner
    }

    return <>{children}</>;
}
