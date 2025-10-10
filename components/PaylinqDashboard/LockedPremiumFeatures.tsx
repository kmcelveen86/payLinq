import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import React from "react";
import { useUserProfile } from "@/app/hooks/useProfile";
import Link from "next/link";

// Define tier-specific locked features and next tiers
const TIER_FEATURES = {
  White: {
    nextTier: "Silver",
    lockedFeatures: [
      "Enhanced Credit Reporting",
      "Premium Travel Benefits",
      "Priority Customer Support",
      "Exclusive VIP Events",
    ],
  },
  Silver: {
    nextTier: "Gold",
    lockedFeatures: [
      "Priority Customer Support",
      "VIP Events & Birthday Gift",
      "Financial Advice Sessions",
      "Premium Lounge Access",
    ],
  },
  Gold: {
    nextTier: "Black",
    lockedFeatures: [
      "Luxury Travel Experiences",
      "Dedicated Account Manager",
      "24/7 Concierge Services",
      "Exclusive VIP Events",
    ],
  },
  Black: {
    nextTier: null,
    lockedFeatures: [],
  },
};

type Props = {
  itemVariants: any;
};

export default function LockedPremiumFeatures(props: Props) {
  const { itemVariants } = props;

  // Fetch user profile
  const { data: profileData, isLoading } = useUserProfile();

  // Get current tier with fallback to White
  const currentTier = profileData?.membershipTier || "White";

  // Get tier-specific information
  const tierInfo =
    TIER_FEATURES[currentTier as keyof typeof TIER_FEATURES] ||
    TIER_FEATURES["White"];

  // If user has Black tier or no next tier, don't show this component
  if (currentTier === "Black" || !tierInfo.nextTier) {
    return null;
  }

  // If still loading, show skeleton
  if (isLoading) {
    return (
      <motion.div
        variants={itemVariants}
        className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-6 animate-pulse"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          <div className="h-6 bg-gray-700 rounded-full w-1/4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-700/50 border border-gray-600 h-12"
            ></div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <div className="h-10 bg-gray-700 rounded-lg w-40 mx-auto"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">{tierInfo.nextTier} Features</h3>
        <span className="text-sm px-3 py-1 rounded-full bg-gray-700 text-gray-300">
          Upgrade to Unlock
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tierInfo.lockedFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-700/50 border border-gray-600 flex items-center"
          >
            <Lock size={16} className="text-[#C28F49] mr-3" />
            <span className="text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href="/membership-tiers">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#2D9642] to-[#C28F49] text-white font-medium inline-flex items-center"
          >
            Upgrade to {tierInfo.nextTier}{" "}
            <ArrowUpRight size={16} className="ml-2" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
