import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import React from "react";
import { useUserProfile } from "@/app/hooks/useProfile";
import Link from "next/link";

// Define tier-specific features with "Coming Soon" status
const TIER_FEATURES = {
  White: {
    showFeatures: true,
    features: [
      "PayLinq Reward Debit Card",
      "Loyalty Rewards Program",
      "AI Powered Shopping Assistant",
      "Referral Bonus Program",
    ],
  },
  Silver: {
    showFeatures: false,
    features: [],
  },
  Gold: {
    showFeatures: false,
    features: [],
  },
  Black: {
    showFeatures: false,
    features: [],
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

  // If still loading, show skeleton
  if (isLoading) {
    return (
      <motion.div
        variants={itemVariants}
        className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-6 animate-pulse"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-700/50 border border-gray-600 h-12"
            ></div>
          ))}
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
        <h3 className="text-lg font-bold">{currentTier} Features</h3>
      </div>

      {tierInfo.showFeatures ? (
        // White tier: Show features with "Coming Soon"
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tierInfo.features.map((feature, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-700/50 border border-gray-600 flex flex-col"
            >
              <span className="text-gray-300 font-medium mb-1">{feature}</span>
              <span className="text-sm text-[#C28F49]">Coming Soon</span>
            </div>
          ))}
        </div>
      ) : (
        // Other tiers: Just show "Coming Soon" message
        <div className="text-center py-8">
          <span className="text-xl text-[#C28F49] font-medium">Coming Soon</span>
        </div>
      )}
    </motion.div>
  );
}
