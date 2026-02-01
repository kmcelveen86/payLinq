"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  HelpCircle,
  Tag,
  Mail,
  User,
  LogOut,
  LogIn,
  ChevronRight,
  Menu,
  X,
  CreditCard,
  Store,
} from "lucide-react";
import {
  useAuth,
  useUser,
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn,
  useSession,
} from "@clerk/nextjs";
import { useUserProfile } from "@/app/hooks/useProfile";

export default function HamburgerMenu() {
  const { isLoaded, session, isSignedIn } = useSession();
  const { data: profileData } = useUserProfile();
  const { email } = profileData || {};
  const clerkUser = useUser();
  const profileDataFullName = !!(
    profileData?.firstName && profileData?.lastName
  );
  const userFullName =
    clerkUser?.user?.fullName ?? profileDataFullName
      ? `${profileData?.firstName
        .charAt(0)
        .toUpperCase()}${profileData?.lastName.charAt(0).toUpperCase()}`
      : "U";
  const userEmail = clerkUser?.user?.primaryEmailAddress as any;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Handle body scroll when drawer is open
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
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const hasOrgAccess = (clerkUser.user?.organizationMemberships?.length ?? 0) > 0;

  const menuItems = [
    {
      text: "Home",
      href: "/",
      icon: <Home size={20} className="text-gray-600" />,
    },
    {
      text: "How it works",
      href: "/howitworks",
      icon: <HelpCircle size={20} className="text-gray-600" />,
    },
    ...(hasOrgAccess
      ? [
        {
          text: "Merchant Portal",
          href: "/merchant",
          icon: <Store size={20} className="text-gray-600" />,
        },
      ]
      : []),
  ];

  if (!isMounted) return null;

  return (
    <div className="bg-gray-900 h-16 flex items-center justify-between px-4 relative z-50">
      {/* Logo Area */}
      <div className="flex items-center">
        <Link href="/">
          <div className="relative w-10 h-10 mr-2">
            <Image
              src="/logos/paylinq-logo-new.png"
              width={40}
              height={40}
              alt="PayLinq Logo"
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Menu Toggle Button */}
      <motion.button
        onClick={toggleDrawer}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white focus:outline-none"
      >
        <Menu size={24} />
      </motion.button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={toggleDrawer}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed top-0 bottom-0 left-0 w-[280px] bg-gray-900 shadow-xl z-50 flex flex-col"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 relative mr-2">
                  <Image
                    src="/logos/paylinq-logo-new.png"
                    fill
                    alt="PayLinq Logo"
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-[#2D9642] to-[#C28F49] bg-clip-text text-transparent">
                  PayLinq
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleDrawer}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Decorative Elements */}
            <div
              className="absolute top-20 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, #2D9642 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div
              className="absolute bottom-20 left-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, #C28F49 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-4 relative">
              <div className="space-y-1 px-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.text}
                    custom={index}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={item.href}
                      onClick={toggleDrawer}
                      className="group relative overflow-hidden"
                    >
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 mr-3">
                          {item.icon}
                        </span>
                        <span className={`font-medium ${item.text === "Merchant Portal" ? "bg-gradient-to-r from-[#2D9642] to-[#C28F49] brightness-125 bg-clip-text text-transparent font-bold" : ""}`}>{item.text}</span>
                        <ChevronRight
                          size={16}
                          className="ml-auto text-gray-500 group-hover:text-white"
                        />
                      </motion.div>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#2D9642] to-[#C28F49] transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <SignedIn>
                <motion.div
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  <div className="border-t border-gray-800 my-4" />
                  <div className="px-2">
                    <Link
                      href="/user/dashboard"
                      onClick={toggleDrawer}
                      className="group relative overflow-hidden"
                    >
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 mr-3">
                          <User size={20} className="text-[#2D9642]" />
                        </span>
                        <span className="font-medium">Dashboard</span>
                        <ChevronRight
                          size={16}
                          className="ml-auto text-gray-500 group-hover:text-white"
                        />
                      </motion.div>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#2D9642] to-[#C28F49] transition-all duration-300" />
                    </Link>
                  </div>
                </motion.div>
              </SignedIn>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800">
              <SignedIn>
                <>
                  <Link href="/user/dashboard">
                    <div className="mb-4 px-3 py-2 bg-gray-800 rounded-lg">
                      <div className="flex items-center mb-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2D9642] to-[#C28F49] flex items-center justify-center text-white font-bold text-sm mr-2">
                          {userFullName}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {userFullName}
                          </div>
                          <div className="text-gray-400 text-xs">{email ?? userFullName}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <div
                      onClick={toggleDrawer}
                      className="w-full flex items-center justify-center p-3 border border-gray-700 text-gray-300 hover:text-white rounded-lg hover:border-gray-600 transition-colors"
                    >
                      <LogOut size={16} className="mr-2" />
                      <SignOutButton />
                    </div>
                  </motion.div>
                </>
              </SignedIn>
              <SignedOut>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <div
                    onClick={toggleDrawer}
                    className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-[#2D9642] to-[#C28F49] text-white rounded-lg shadow-lg hover:shadow-[#2D9642]/20 transition-all"
                  >
                    <LogIn size={16} className="mr-2" />
                    <SignInButton>Join Waitlist</SignInButton>
                  </div>
                </motion.div>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
