"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import AvailableRewards from "./AvailableRewards";
import LockedPremiumFeatures from "./LockedPremiumFeatures";
import MultiplierDetails from "./MultiplierDetails";
import PlanUpgradeBanner from "./PlanUpgradeBanner";
import PointsSummaryCard from "./PointsSummaryCard";
import RecentTransactions from "./RecentTransactions";
import SideBar from "./SideBar";
import userData from "./data";

import { CreditCard, Bell, User } from "lucide-react";
import Link from "next/link";
import { useUserProfile } from "@/app/hooks/useProfile";

const PaylinqDashboard = () => {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useUserProfile();
  const { firstName, image } = profileData || {};
  const [activeTab, setActiveTab] = useState("overview");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #2D9642 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #C28F49 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Header */}
      <Link href="/">
        <div className="relative">
          <header className="bg-gray-800 bg-opacity-70 backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard size={32} className="text-[#2D9642] mr-2" />
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2D9642] to-[#C28F49]">
                    PayLinq
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="relative p-2 rounded-full hover:bg-gray-700 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 h-4 w-4 bg-[#2D9642] rounded-full flex items-center justify-center text-xs">
                      3
                    </span>
                  </button>
                  <div className="flex items-center space-x-3">
                    {image ? (
                      <img
                        src={image}
                        alt={firstName}
                        className="h-9 w-9 rounded-full border-2 border-[#C28F49]"
                        // onError={(e) => {
                        //   // If image fails to load, show default avatar
                        //   e.currentTarget.src = "/default-avatar.png";
                        // }}
                      />
                    ) : (
                      <User size={40} className="text-gray-400" />
                    )}
                    <span className="font-medium hidden md:block">
                      {userData.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </Link>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          <SideBar
            itemVariants={itemVariants}
            userData={userData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* Main Dashboard Content */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 space-y-8"
          >
            <PlanUpgradeBanner itemVariants={itemVariants} />

            <PointsSummaryCard userData={userData} />

            <MultiplierDetails itemVariants={itemVariants} />

            <RecentTransactions
              userData={userData}
              itemVariants={itemVariants}
            />

            {/* <AvailableRewards userData={userData} itemVariants={itemVariants} /> */}

            <LockedPremiumFeatures itemVariants={itemVariants} />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default PaylinqDashboard;
