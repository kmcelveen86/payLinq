import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import React from "react";
import { useUserProfile } from "@/app/hooks/useProfile";

type Props = {
  itemVariants: any;
};

// Define expiration periods for each tier
const EXPIRATION_INFO = {
  Freemium: {
    period: "18 months",
    message:
      "With the Freemium plan, your points expire after 18 months. Upgrade to Lifestyle or higher to extend your points' validity period.",
  },
  Lifestyle: {
    period: "24 months",
    message:
      "With your Lifestyle plan, your points expire after 24 months. Upgrade to VIP Lifestyle or higher for even longer validity periods.",
  },
  "VIP Lifestyle": {
    period: "36 months",
    message:
      "With your VIP Lifestyle plan, your points expire after 36 months. Upgrade to Elite Lifestyle for points that never expire.",
  },
  "Elite Lifestyle": {
    period: "Never",
    message:
      "Congratulations! With your Elite Lifestyle plan, your points never expire. Enjoy unlimited time to use your rewards.",
  },
};

export default function PointsExpirationWarning(props: Props) {
  const { itemVariants } = props;

  const { data: profileData, isLoading } = useUserProfile();

  // Get current membership tier with fallback to Freemium
  const currentTier = profileData?.membershipTier || "Freemium";

  // Get tier-specific information
  const tierInfo =
    EXPIRATION_INFO[currentTier as keyof typeof EXPIRATION_INFO] ||
    EXPIRATION_INFO["Freemium"];

  // Determine if this is the Elite tier (for styling)
  const isEliteTier = currentTier === "Elite Lifestyle";

  // If still loading, show a skeleton
  if (isLoading) {
    return (
      <motion.div
        variants={itemVariants}
        className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-5 border border-gray-700 animate-pulse"
      >
        <div className="flex items-start">
          <div className="p-2 rounded-full bg-gray-700 mr-4 h-8 w-8"></div>
          <div className="w-full">
            <div className="h-5 bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mt-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mt-2"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-5 border ${
        isEliteTier ? "border-green-600/30" : "border-amber-600/30"
      }`}
    >
      <div className="flex items-start">
        <div
          className={`p-2 rounded-full ${
            isEliteTier ? "bg-green-500/20" : "bg-amber-500/20"
          } mr-4`}
        >
          <Clock
            size={20}
            className={isEliteTier ? "text-green-500" : "text-amber-500"}
          />
        </div>
        <div>
          <h3
            className={`font-medium ${
              isEliteTier ? "text-green-400" : "text-amber-400"
            }`}
          >
            {`Points Expiration: ${tierInfo.period}`}
          </h3>
          <p className="text-gray-300 text-sm mt-1">{tierInfo.message}</p>
        </div>
      </div>
    </motion.div>
  );
}
