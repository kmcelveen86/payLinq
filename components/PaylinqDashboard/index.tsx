"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import AvailableRewards from "./AvailableRewards";
import LockedPremiumFeatures from "./LockedPremiumFeatures";
import MultiplierDetails from "./MultiplierDetails";
import PlanComparison from "./PlanComparison";
import PlanUpgradeBanner from "./PlanUpgradeBanner";
import PointsExpirationWarning from "./PointsExpirationWarning";
import PointsSummaryCard from "./PointsSummaryCard";
import RecentTransactions from "./RecentTransactions";
import SideBar from "./SideBar";
import userData from "./data";

import { CreditCard, Bell } from "lucide-react";
import Link from "next/link";

const PaylinqDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Plan comparison data
  const planTiers = [
    {
      name: "Freemium",
      pointMultiplier: {
        everyday: "1x",
        dining: "2x",
        travel: "2x",
      },
      maxMonthly: "10,000",
      active: true,
    },
    {
      name: "Lifestyle",
      pointMultiplier: {
        everyday: "2x",
        dining: "3x",
        travel: "3x",
      },
      maxMonthly: "20,000",
      active: false,
    },
    {
      name: "VIP Lifestyle",
      pointMultiplier: {
        everyday: "3x",
        dining: "4x",
        travel: "4x",
      },
      maxMonthly: "30,000",
      active: false,
    },
    {
      name: "Elite Lifestyle",
      pointMultiplier: {
        everyday: "5x",
        dining: "5x",
        travel: "5x",
      },
      maxMonthly: "50,000",
      active: false,
    },
  ];

  // Features locked in freemium
  const lockedFeatures = [
    "Enhanced Credit Reporting",
    "Premium Travel Benefits",
    "Priority Customer Support",
    "Exclusive VIP Events",
  ];

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
                    Paylinq
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
                    <img
                      src={userData.profileImage}
                      alt={userData.name}
                      className="h-9 w-9 rounded-full border-2 border-[#C28F49]"
                    />
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
            <PlanUpgradeBanner itemVarients={itemVariants} />

            <PointsSummaryCard userData={userData} />

            <MultiplierDetails itemVariants={itemVariants} />

            <RecentTransactions
              userData={userData}
              itemVariants={itemVariants}
            />

            <AvailableRewards userData={userData} itemVariants={itemVariants} />

            <LockedPremiumFeatures
              itemVariants={itemVariants}
              lockedFeatures={lockedFeatures}
            />

            <PlanComparison itemVariants={itemVariants} />

            <PointsExpirationWarning itemVariants={itemVariants} />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default PaylinqDashboard;
