import { motion } from "framer-motion";
import { TrendingUp, Gift, Award, CheckCircle } from "lucide-react";
import React from "react";
import userData from "./data";
import Link from "next/link";
import { useUserProfile } from "@/app/hooks/useProfile";

// Define tier-specific information
const TIER_INFO = {
  White: {
    maxPointsPerYear: 120000,
    expirationMonths: 18,
    redemptionRate: 0.01, // $0.01 per point ($10 redemption / 1000 points)
  },
  Silver: {
    maxPointsPerYear: 240000,
    expirationMonths: 24,
    redemptionRate: 0.0125, // $0.0125 per point ($12.50 redemption / 1000 points)
  },
  Gold: {
    maxPointsPerYear: 360000,
    expirationMonths: 36,
    redemptionRate: 0.0175, // $0.0175 per point ($17.50 redemption / 1000 points)
  },
  Black: {
    maxPointsPerYear: 600000,
    expirationMonths: 0, // Never expires
    redemptionRate: 0.02, // $0.02 per point ($20 redemption / 1000 points)
  },
};

type Props = {
  userData: typeof userData;
};

export default function PointsSummaryCard(props: Props) {
  const { userData } = props;

  // Get user's membership tier
  const { data: profileData } = useUserProfile();

  // Get current tier without fallback to White for "No Tier" detection
  const hasTier = !!profileData?.membershipTier;
  const currentTier = profileData?.membershipTier || "White"; // Keep fallback for displaying limits/rates if needed, or handle separately

  // Get tier-specific limits
  const tierInfo =
    TIER_INFO[currentTier as keyof typeof TIER_INFO] || TIER_INFO["White"];

  // Helper consts for redemption display
  // ... existing calculation logic ...
  const redeemableBlockCount = Math.floor(userData.totalPoints / 1000);
  const redeemablePoints = redeemableBlockCount * 1000;
  const redeemableValue = redeemablePoints * tierInfo.redemptionRate;
  const displayValue = redeemableValue;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Points Card - Unchanged */}
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-5"
      >
        <div className="flex justify-between">
          <h3 className="text-gray-400 text-sm">Total Points</h3>
          <div className="p-2 rounded-lg bg-[#2D9642]/20">
            <TrendingUp size={18} className="text-[#2D9642]" />
          </div>
        </div>
        <p className="text-3xl font-bold mt-2">
          {userData.totalPoints.toLocaleString()}
        </p>
        <div className="mt-2 text-xs text-gray-400">
          <div className="flex justify-between mb-1">
            <span>Points this month:</span>
            <span className="text-green-500">
              {userData.pointsThisMonth.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Redeemable Value:</span>
            <span className="text-white">
              $
              {displayValue.toLocaleString(
                undefined,
                { minimumFractionDigits: 2, maximumFractionDigits: 2 }
              )}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Redemption Value Card - Unchanged */}
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-gradient-to-br from-gray-800 to-[#C28F49]/10 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-5 border border-[#C28F49]/20"
      >
        <div className="flex justify-between">
          <h3 className="text-gray-400 text-sm">Current Redemption Value</h3>
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#C28F49] to-amber-500">
            <Gift size={18} className="text-white" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-4xl font-bold bg-gradient-to-r from-[#C28F49] to-amber-400 bg-clip-text text-transparent">
            ${displayValue.toLocaleString(
              undefined,
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}
          </p>
          <p className="text-xs text-gray-400 mt-1">Available to redeem now</p>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-700/50">
          <p className="text-xs text-gray-500 text-center">
            Redeem anytime • 1,000 point increments • Points never expire
          </p>
        </div>
      </motion.div>

      {/* Dynamic Tier Details Section */}
      <motion.div
        whileHover={{ y: -5 }}
        className={`rounded-xl shadow-xl p-5 ${!hasTier
          ? "bg-gradient-to-br from-gray-800 to-red-900/20 border border-red-500/20"
          : "bg-gray-800 bg-opacity-70 backdrop-blur-md"
          }`}
      >
        {!hasTier ? (
          // NO TIER STATE
          <>
            <div className="flex justify-between">
              <h3 className="text-gray-200 text-sm font-semibold">Unlock Rewards</h3>
              <div className="p-2 rounded-lg bg-red-500/20">
                <Award size={18} className="text-red-400" />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-400">
                You are currently on the <span className="text-white font-medium">Free Tier</span>. You are likely missing out on points.
              </p>
              <Link href="/pricing">
                <button
                  className="w-full py-2 bg-[#2D9642] hover:bg-[#258036] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Choose a Plan <TrendingUp size={14} />
                </button>
              </Link>
            </div>
          </>
        ) : (
          // ACTIVE TIER STATE
          <>
            <div className="flex justify-between">
              <h3 className="text-gray-400 text-sm">{currentTier} Details</h3>
              <div className="p-2 rounded-lg bg-gray-700">
                <Award size={18} className="text-[#C28F49]" />
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center text-gray-300">
                <CheckCircle
                  size={14}
                  className="text-[#2D9642] mr-2 flex-shrink-0"
                />
                <span>
                  <Link href="/pricing">Points never expire</Link>
                </span>
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle
                  size={14}
                  className="text-[#2D9642] mr-2 flex-shrink-0"
                />
                <span>
                  No points limits
                </span>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
