"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


interface Props {
    className?: string;
    onNavigate?: () => void;
}

export default function AdminSidebar({ className, onNavigate }: Props) {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Merchants", href: "/merchants" },
        { name: "Customers", href: "/customers" },
        { name: "Conversions", href: "/conversions" },
        { name: "UPP", href: "/upp" },
        { name: "Analytics", href: "/analytics" },
        { name: "Audit Log", href: "/audit-log" },
        { name: "Security", href: "/security", className: "hover:bg-red-900/50 text-red-200" },
        { name: "Settings", href: "/settings" },
    ];

    return (
        <aside className={`bg-gray-900 text-white min-h-screen p-4 flex flex-col ${className || "w-64"}`}>
            <h2 className="text-xl font-bold mb-6 px-4">PayLinq Admin</h2>
            <nav className="space-y-1 flex-1">
                {navItems.map((item) => {
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
