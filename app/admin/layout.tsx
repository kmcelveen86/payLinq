import React from "react";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";

// Placeholder components - will be implemented in next steps
const AdminSidebar = () => (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">PayLinq Admin</h2>
        <nav className="space-y-2">
            <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-800 rounded">Dashboard</Link>
            <Link href="/merchants" className="block px-4 py-2 hover:bg-gray-800 rounded">Merchants</Link>
            <Link href="/customers" className="block px-4 py-2 hover:bg-gray-800 rounded">Customers</Link>
            <Link href="/conversions" className="block px-4 py-2 hover:bg-gray-800 rounded">Conversions</Link>
            <Link href="/upp" className="block px-4 py-2 hover:bg-gray-800 rounded">UPP</Link>
            <Link href="/analytics" className="block px-4 py-2 hover:bg-gray-800 rounded">Analytics</Link>
            <Link href="/audit-log" className="block px-4 py-2 hover:bg-gray-800 rounded">Audit Log</Link>
            <Link href="/settings" className="block px-4 py-2 hover:bg-gray-800 rounded">Settings</Link>
        </nav>
    </aside>
);

const AdminHeader = () => (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">
        <h1 className="text-lg font-semibold text-gray-900">Admin Portal</h1>
        {/* User details will be handled by client components or specialized header */}
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
