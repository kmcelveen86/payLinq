"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Menu,
    X,
    LayoutDashboard,
    Settings,
    LogOut,
    ChevronRight,
    Shield, // Added Shield icon
} from "lucide-react";
import {
    useUser,
    SignOutButton,
    SignedIn,
    SignedOut,
    SignInButton,
    OrganizationSwitcher,
    useOrganization,
} from "@clerk/nextjs";

export default function MerchantMobileMenu() {
    const { user } = useUser();
    const { organization } = useOrganization();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (drawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [drawerOpen]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const menuVariants = {
        hidden: { x: "100%" },
        visible: { x: 0 },
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const baseItems = [
        {
            text: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard size={20} className="text-foreground" />,
        },
        {
            text: "Settings",
            href: "/settings",
            icon: <Settings size={20} className="text-foreground" />,
        },
    ];

    if (user?.publicMetadata?.adminRole === "super_admin") {
        baseItems.push({
            text: "Super Admin",
            href: (() => {
                if (typeof window === "undefined") return "/admin";
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
                return baseUrl.replace("://", "://admin.");
            })(),
            icon: <Shield size={20} className="text-foreground" />,
        });
    }

    const menuItems = organization ? baseItems : [];

    if (!isMounted) return null;

    const drawerContent = (
        <div className="relative z-[9999]">
            <AnimatePresence>
                {drawerOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={overlayVariants}
                        onClick={toggleDrawer}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {drawerOpen && (
                    <motion.div
                        className="fixed top-0 bottom-0 right-0 w-[280px] bg-[#09090b] border-l border-white/10 shadow-2xl flex flex-col"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                        transition={{ type: "spring", damping: 25, stiffness: 250 }}
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <span className="font-bold text-lg text-foreground">Menu</span>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleDrawer}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
                            >
                                <X size={18} />
                            </motion.button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={toggleDrawer}
                                    className="flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                >
                                    <span className="flex items-center justify-center w-8 h-8 rounded-md bg-white/5 mr-3 group-hover:bg-white/10">
                                        {item.icon}
                                    </span>
                                    <span className="font-medium text-foreground">{item.text}</span>
                                    <ChevronRight
                                        size={16}
                                        className="ml-auto text-muted-foreground group-hover:text-foreground"
                                    />
                                </Link>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/10 bg-white/5 space-y-4">
                            <SignedIn>
                                <div className="w-full">
                                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Organization</p>
                                    <div className="w-full [&_.cl-organizationSwitcherTrigger]:w-full [&_.cl-organizationSwitcherTrigger]:justify-between [&_.cl-organizationSwitcherTrigger]:bg-white/5 [&_.cl-organizationSwitcherTrigger]:border-white/10 [&_.cl-organizationSwitcherTrigger]:text-foreground">
                                        <OrganizationSwitcher
                                            afterCreateOrganizationUrl="/dashboard"
                                            afterLeaveOrganizationUrl="/dashboard"
                                            afterSelectOrganizationUrl="/dashboard"
                                            afterSelectPersonalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || "https://getpaylinq.com"}/user/dashboard`}
                                            appearance={{
                                                elements: {
                                                    organizationSwitcherTrigger: "py-2 px-3 border border-border rounded-md hover:bg-white/10 transition-colors w-full flex justify-between",
                                                    organizationPreviewTextContainer: "text-foreground",
                                                    organizationPreviewMainIdentifier: "text-foreground font-medium",
                                                    organizationPreviewSecondaryIdentifier: "text-muted-foreground"
                                                },
                                                variables: {
                                                    colorText: "white",
                                                    colorBackground: "#09090b",
                                                    colorInputBackground: "#09090b",
                                                    colorInputText: "white",
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3 border border-primary/20">
                                        {user?.firstName?.charAt(0) || user?.username?.charAt(0) || "M"}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-medium truncate text-foreground">{user?.fullName || user?.username}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <SignOutButton>
                                        <button className="w-full flex items-center justify-center p-2.5 border border-white/10 rounded-lg text-sm font-medium text-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors">
                                            <LogOut size={16} className="mr-2" />
                                            Sign Out
                                        </button>
                                    </SignOutButton>
                                </div>
                            </SignedIn>

                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="w-full bg-primary text-primary-foreground p-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <>
            <motion.button
                onClick={toggleDrawer}
                whileTap={{ scale: 0.95 }}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-foreground focus:outline-none hover:bg-muted"
            >
                <Menu size={24} />
            </motion.button>
            {createPortal(drawerContent, document.body)}
        </>
    );
}
