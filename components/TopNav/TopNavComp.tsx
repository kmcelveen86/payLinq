"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@mui/material";
import {
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser,
  useSession,
} from "@clerk/nextjs";
import TopNavDropDown from "@/components/TopNavDropDown";
import HamburgerMenu from "../HamburgerMenu";
import TopNav from "./index";

export default function TopNavComp() {
  const isMobile = useMediaQuery("(max-width:720px)");
  const { isLoaded, session, isSignedIn } = useSession();
  const clerkUser = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Set active link based on current path
    const path = window.location.pathname;
    setActiveLink(path);

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { href: "/howitworks", label: "How It Works", color: "#2D9642" },
    { href: "/pricing", label: "Features", color: "#C28F49" },
    { href: "/contact", label: "Contact Us", color: "#2D9642" },
  ];

  if (isMobile) {
    return <HamburgerMenu />;
  }

  return (
    <TopNav>
      <>
        {/* Gradient top border */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 right-0 h-[3px] z-10"
          style={{
            background: "linear-gradient(90deg, #2D9642, #C28F49)",
          }}
        />

        {/* Navbar Background - changes on scroll */}
        <motion.div
          className="absolute inset-0 z-0 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{
            opacity: scrolled ? 0.8 : 0,
            backgroundColor: scrolled ? "#111827" : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Logo Section */}
        <div className="flex justify-between flex-1 relative items-center">
          <motion.div
            className="flex-grow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <div className="relative group">
                <Image
                  src="/logos/paylinq-logo-new.png"
                  width={70}
                  height={70}
                  alt="Paylinq Logo"
                  className="sm:ml-4 lg:ml-[133px] transition-transform duration-300 group-hover:scale-105"
                />
                {/* Logo glow effect */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(45, 150, 66, 0.3) 0%, rgba(194, 143, 73, 0.1) 70%, transparent 100%)",
                    filter: "blur(8px)",
                    zIndex: -1,
                  }}
                />
              </div>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="pr-10 flex items-center space-x-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((link, index) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className="relative mx-2 px-4 py-2 text-white font-medium cursor-pointer"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] w-full"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: activeLink === link.href ? 1 : 0,
                      backgroundColor: link.color,
                    }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Right side - User or Sign Up */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="sm:mr-4 lg:mr-10"
        >
          {clerkUser.isSignedIn ? (
            <TopNavDropDown />
          ) : (
            <div className="flex items-center justify-end">
              <SignedIn>
                <TopNavDropDown />
              </SignedIn>
              <SignedOut>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden"
                >
                  <div className="relative z-10 px-6 py-2 rounded-full bg-gradient-to-r from-[#2D9642] to-[#C28F49] shadow-lg">
                    <SignUpButton>
                      <span className="font-medium text-white">
                        Join Waitlist
                      </span>
                    </SignUpButton>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#236f34] to-[#b37f41] rounded-full"
                    animate={{
                      x: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                    style={{ filter: "blur(8px)", opacity: 0.5, zIndex: 0 }}
                  />
                </motion.div>
              </SignedOut>
            </div>
          )}
        </motion.div>
      </>
    </TopNav>
  );
}
