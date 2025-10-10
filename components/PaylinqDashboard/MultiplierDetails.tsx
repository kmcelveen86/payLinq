import { motion } from "framer-motion";
import { TrendingUp, Coins, Sparkles, ArrowRight } from "lucide-react";
import { useUserProfile } from "@/app/hooks/useProfile";

// Define tier-specific redemption values
const TIER_REDEMPTION = {
  White: {
    pointsFor10: 1000,
    redemptionValue: 10,
    multiplier: 1,
  },
  Silver: {
    pointsFor10: 1000,
    redemptionValue: 12.50,
    multiplier: 1.25,
  },
  Gold: {
    pointsFor10: 1000,
    redemptionValue: 17.50,
    multiplier: 1.75,
  },
  Black: {
    pointsFor10: 1000,
    redemptionValue: 20,
    multiplier: 2,
  },
};

type Props = {
  itemVariants: any;
};

export default function MultiplierDetails(props: Props) {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useUserProfile();
  const { itemVariants } = props;

  // Get current tier with fallback to White
  const currentTier = profileData?.membershipTier || "White";

  // Get redemption info for the current tier
  const redemptionInfo =
    TIER_REDEMPTION[currentTier as keyof typeof TIER_REDEMPTION] ||
    TIER_REDEMPTION.White;

  // Skeleton loader
  if (isProfileLoading) {
    return (
      <motion.div
        variants={itemVariants}
        className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-6 animate-pulse"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          <div className="h-6 bg-gray-700 rounded-full w-1/4"></div>
        </div>
        <div className="h-32 bg-gray-700/50 rounded-xl"></div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-8 border border-gray-700/50"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#2D9642] to-[#38b053]">
            <Sparkles size={20} className="text-white" />
          </div>
          <h3 className="text-xl font-bold">Your Rewards Value</h3>
        </div>
        <span className="text-sm px-3 py-1 rounded-full bg-[#2D9642]/20 text-[#2D9642] font-semibold">
          {currentTier}
        </span>
      </div>

      {/* Main Redemption Display */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2D9642]/20 via-gray-800/50 to-[#C28F49]/20 border border-[#2D9642]/30 p-8">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D9642]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C28F49]/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coins size={24} className="text-[#C28F49]" />
              <p className="text-gray-400 text-sm font-medium">Every $10 You Spend</p>
            </div>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-1">
                  {redemptionInfo.pointsFor10.toLocaleString()}
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Points Earned</p>
              </div>

              <ArrowRight size={32} className="text-[#2D9642] animate-pulse" />

              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-[#2D9642] to-[#38b053] bg-clip-text text-transparent">
                  ${redemptionInfo.redemptionValue.toFixed(2)}
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Redemption Value</p>
              </div>
            </div>
          </div>

          {/* Value Info Badge */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-700/50">
            <TrendingUp size={18} className="text-[#2D9642]" />
            <p className="text-sm text-gray-300">
              Your <span className="font-bold text-[#2D9642]">{currentTier}</span> tier redemption value
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
        <Sparkles size={14} className="text-[#C28F49]" />
        <p>Earn points on all purchases • No limits • Points never expire</p>
      </div>
    </motion.div>
  );
}
