import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { AlertCircle, Lock } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        return <>{children}</>;
    }

    // Fetch critical user status (banned)
    // We do not use the useUserProfile hook here because we are on the server
    // and we want to BLOCK rendering if banned.
    const user = await prisma.user.findFirst({
        where: { clerkId: userId },
        select: { banned: true, bannedReason: true }
    });

    if (user?.banned) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-gray-800 border border-red-900/50 rounded-lg shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-red-900/20 p-6 flex flex-col items-center border-b border-red-900/30">
                        <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-red-500">Account Suspended</h1>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-6">
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-300 mb-1">Reason for suspension:</h3>
                                    <p className="text-gray-400 text-sm">
                                        {user.bannedReason || "Violation of Terms of Service"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-400 text-center text-sm">
                            Your account access has been temporarily revoked due to a dispute or security concern.
                            Please check your email for more details or contact support to resolve this issue.
                        </p>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/contact"
                                className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-center transition-colors font-medium text-sm"
                            >
                                Contact Support
                            </Link>

                            <div className="w-full">
                                <SignOutButton>
                                    <button className="w-full py-2 px-4 border border-gray-700 hover:bg-gray-700 text-gray-300 rounded-md transition-colors text-sm">
                                        Sign Out
                                    </button>
                                </SignOutButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-gray-600 text-xs">
                    Pass ID: {userId}
                </div>
            </div>
        );
    }

    // Not banned, render children normally
    return <>{children}</>;
}
