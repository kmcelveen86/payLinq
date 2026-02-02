"use client";
import React, { useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { SignOutButton } from "@clerk/nextjs";
import AdminSidebar from "./AdminSidebar";
import { Menu, X } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <AdminGuard>
            <div className="flex min-h-screen bg-gray-100">
                {/* Desktop Sidebar - Hidden on mobile */}
                <AdminSidebar className="hidden md:flex w-64" />

                {/* Mobile Sidebar Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-50 flex md:hidden">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/50 transition-opacity"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Sidebar Drawer */}
                        <AdminSidebar
                            className="relative w-64 h-full shadow-xl"
                            onNavigate={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Close Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-4 right-4 p-2 text-white bg-gray-900 rounded-full md:hidden z-50 left-64 ml-4"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                <div className="flex-1 flex flex-col min-w-0">
                    <header className="bg-white border-b h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
                            >
                                <Menu size={24} />
                            </button>
                            <h1 className="text-lg font-semibold text-gray-900 truncate">Admin Portal</h1>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <SignOutButton redirectUrl={process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}>
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm font-medium transition-colors whitespace-nowrap">
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </div>
                    </header>
                    <main className="flex-1 p-4 sm:p-6 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </AdminGuard>
    );
}
