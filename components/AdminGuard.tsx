"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComp from "./LoadingComp";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            router.push("/sign-in");
            return;
        }

        const role = user?.publicMetadata?.adminRole;
        if (role === "super_admin" || role === "support") {
            setAuthorized(true);
        }
    }, [isLoaded, isSignedIn, user, router]);

    if (!isLoaded) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-100">
                <LoadingComp />
            </div>
        );
    }

    if (!authorized) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
                    <p className="text-gray-600 mb-6">
                        You do not have permission to access the Admin Portal.
                    </p>

                    <div className="bg-gray-100 p-4 rounded text-left text-sm mb-6 overflow-auto">
                        <p><strong>User ID:</strong> {user?.id || "Not Logged In"}</p>
                        <p><strong>Role:</strong> {(user?.publicMetadata?.adminRole as string) || "None"}</p>
                        <p><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress || "None"}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {!isSignedIn ? (
                            <button
                                onClick={() => router.push("/sign-in")}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Sign In
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    const mainUrl = window.location.hostname.includes("localhost")
                                        ? "http://localhost:3000"
                                        : "https://getpaylinq.com";
                                    window.location.href = mainUrl;
                                }}
                                className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
                            >
                                Return to Main Site
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
