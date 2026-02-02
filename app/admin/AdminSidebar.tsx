"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { PERMISSIONS, AdminRole } from "@/lib/admin-permissions";


interface Props {
    className?: string;
    onNavigate?: () => void;
}

export default function AdminSidebar({ className, onNavigate }: Props) {
    const pathname = usePathname();

    const { user } = useUser();
    const role = user?.publicMetadata?.adminRole as AdminRole | undefined;

    const navItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            allowed: role && PERMISSIONS.VIEW_DASHBOARD.includes(role)
        },
        {
            name: "Merchants",
            href: "/merchants",
            allowed: role && PERMISSIONS.VIEW_MERCHANTS.includes(role)
        },
        {
            name: "Customers",
            href: "/customers",
            allowed: role && PERMISSIONS.VIEW_CUSTOMERS.includes(role)
        },
        {
            name: "Conversions",
            href: "/conversions",
            allowed: role && PERMISSIONS.VIEW_UPP.includes(role) // Conversions related to UPP/Merchants
        },
        {
            name: "UPP",
            href: "/upp",
            allowed: role && PERMISSIONS.VIEW_UPP.includes(role)
        },
        {
            name: "Analytics",
            href: "/analytics",
            allowed: role && PERMISSIONS.VIEW_ANALYTICS.includes(role)
        },
        {
            name: "Audit Log",
            href: "/audit-log",
            allowed: role && PERMISSIONS.VIEW_AUDIT_LOGS.includes(role)
        },
        {
            name: "Security",
            href: "/security",
            allowed: role && PERMISSIONS.VIEW_SECURITY_LOGS.includes(role),
            className: "hover:bg-red-900/50 text-red-200"
        },
        {
            name: "Settings",
            href: "/settings",
            allowed: true // Everyone needs settings (e.g. sign out / profile)
        },
    ];

    return (
        <aside className={`bg-gray-900 text-white min-h-screen p-4 flex flex-col ${className || "w-64"}`}>
            <h2 className="text-xl font-bold mb-6 px-4">PayLinq Admin</h2>
            <nav className="space-y-1 flex-1">
                {navItems.filter(i => i.allowed !== false).map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={`block px-4 py-2 rounded transition-colors ${isActive
                                ? "bg-gray-800 text-white font-medium border-l-4 border-blue-500"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                } ${item.className || ""}`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-4 mt-4 border-t border-gray-800">
                <a
                    href={`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/user/dashboard`}
                    className="block px-4 py-2 hover:bg-gray-800 rounded text-green-400 text-sm"
                >
                    &larr; PayLinq App
                </a>
            </div>
        </aside>
    );
}
