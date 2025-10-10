import { motion } from "framer-motion";
import { Shield, ArrowUpRight, Award } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useUserProfile } from "@/app/hooks/useProfile";

// Define the tier information for each plan
const TIER_INFO = {
  White: {
    tagline:
      "You earn 1x point per dollar on all purchases.",
    nextTier: "Silver",
    pointsMultiplier: { everyday: 1, dining: 2, travel: 2 },
  },
  Silver: {
    tagline:
      "You earn 1x point per dollar on all purchases.",
    nextTier: "Gold",
    pointsMultiplier: { everyday: 2, dining: 3, travel: 3 },
  },
  Gold: {
    tagline:
      "You earn 1x point per dollar on all purchases.",
    nextTier: "Black",
    pointsMultiplier: { everyday: 3, dining: 4, travel: 4 },
  },
  Black: {
    tagline:
      "You earn 1x point per dollar on all purchases.",
    nextTier: null, // No next tier
    pointsMultiplier: { everyday: 5, dining: 5, travel: 5 },
  },
};

interface PlanUpgradeBannerProps {
  itemVariants: any;
}

export default function PlanUpgradeBanner({
  itemVariants,
}: PlanUpgradeBannerProps) {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useUserProfile();

  const { membershipTier, firstName, lastName, image } =
    profileData || {};

  // Default to no tier if not provided
  const currentTier = membershipTier || "No Plan";

  // Get the tier info or use default for users without a plan
  const tierInfo =
    currentTier in TIER_INFO
      ? TIER_INFO[currentTier as keyof typeof TIER_INFO]
      : {
          tagline:
            "You're not earning any points yet. Upgrade to start earning rewards!",
          nextTier: "White",
          pointsMultiplier: { everyday: 0, dining: 0, travel: 0 },
        };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3 }}
      className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-xl p-5 border border-gray-700 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2D9642] rounded-full opacity-10 transform translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#C28F49] rounded-full opacity-10 transform -translate-x-10 translate-y-10"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
        <div>
          <div className="flex items-center mb-2">
            {currentTier === "No Plan" ? (
              <Award size={18} className="text-gray-400 mr-2" />
            ) : (
              <Shield size={18} className="text-[#2D9642] mr-2" />
            )}
            <h3 className="text-lg font-bold">
              {currentTier === "No Plan"
                ? "No Active Plan"
                : `${currentTier} Plan`}
            </h3>
            <span className="ml-2 px-2 py-0.5 bg-gray-600 rounded-full text-xs">
              Current Plan
            </span>
          </div>
          <p className="text-gray-300 mb-4 md:mb-0">{tierInfo.tagline}</p>
        </div>

        <Link href="/membership-tiers">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#2D9642] to-[#C28F49] text-white font-medium flex items-center whitespace-nowrap"
          >
            {currentTier === "No Plan"
              ? "Choose a Plan"
              : currentTier === "Black"
              ? "Downgrade Plan"
              : "Upgrade Plan"}
            <ArrowUpRight size={16} className="ml-2" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
