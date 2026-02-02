"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MerchantTabs({ id }: { id: string }) {
    const pathname = usePathname();
    const baseUrl = `/merchants/${id}`;

    const tabs = [
        { name: "Overview", href: baseUrl, exact: true },
        { name: "Analytics", href: `${baseUrl}/analytics`, exact: false },
        { name: "Conversions", href: `${baseUrl}/conversions`, exact: false },
    ];

    const isActive = (tab: typeof tabs[0]) => {
        if (tab.exact) return pathname === tab.href;
        return pathname.startsWith(tab.href);
    };

    return (
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                    const active = isActive(tab);
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`
                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                ${active
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }
              `}
                        >
                            {tab.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
