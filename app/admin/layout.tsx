import React from "react";
import AdminGuard from "@/components/AdminGuard";
import { SignOutButton } from "@clerk/nextjs";
import AdminSidebar from "./AdminSidebar";

const AdminHeader = () => (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">
        <h1 className="text-lg font-semibold text-gray-900">Admin Portal</h1>
        <div className="flex items-center gap-4">
            <SignOutButton redirectUrl={process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}>
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm font-medium transition-colors">
                    Sign Out
                </button>
            </SignOutButton>
        </div>
    </header>
);

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Removed server-side auth check to avoid loops/issues without middleware.
    // Using Client-side AdminGuard instead.

    return (
        <AdminGuard>
            <div className="flex min-h-screen bg-gray-100">
                <AdminSidebar />
                <div className="flex-1 flex flex-col">
                    <AdminHeader />
                    <main className="flex-1 p-6 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </AdminGuard>
    );
}
