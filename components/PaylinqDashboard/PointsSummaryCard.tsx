import { motion } from "framer-motion";
import { TrendingUp, Gift, Award, CheckCircle } from "lucide-react";
import React from "react";
import userData from "./data";
import { useUserProfile } from "@/app/hooks/useProfile";

// Define tier-specific information
const TIER_INFO = {
  Freemium: {
    maxPointsPerMonth: 10000,
    maxPointsPerYear: 120000,
    expirationMonths: 18,
  },
  Lifestyle: {
    maxPointsPerMonth: 20000,
    maxPointsPerYear: 240000,
    expirationMonths: 24,
  },
  "VIP Lifestyle": {
    maxPointsPerMonth: 30000,
    maxPointsPerYear: 360000,
    expirationMonths: 36,
  },
  "Elite Lifestyle": {
    maxPointsPerMonth: 50000,
    maxPointsPerYear: 600000,
    expirationMonths: 0, // Never expires
  },
};

type Props = {
  userData: typeof userData;
};

export default function PointsSummaryCard(props: Props) {
  const { userData } = props;

  // Get user's membership tier
  const { data: profileData } = useUserProfile();
  const currentTier = profileData?.membershipTier || "Freemium";

  // Get tier-specific limits
  const tierInfo =
    TIER_INFO[currentTier as keyof typeof TIER_INFO] || TIER_INFO["Freemium"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <span>Cash equivalent:</span>
            <span className="text-white">
              $
              {(
                userData.totalPoints * userData.freemiumLimits.redemptionRate
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-5"
      >
        <div className="flex justify-between">
          <h3 className="text-gray-400 text-sm">Redemption Goal</h3>
          <div className="p-2 rounded-lg bg-[#C28F49]/20">
            <Gift size={18} className="text-[#C28F49]" />
          </div>
        </div>
        <p className="text-xl font-bold mt-2">$100 Cash Equivalent</p>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Progress</span>
            <span className="text-white">
              {Math.floor(
                (userData.totalPoints / userData.freemiumLimits.pointsFor100) *
                  100
              )}
              %
            </span>
          </div>
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.floor(
                  (userData.totalPoints /
                    userData.freemiumLimits.pointsFor100) *
                    100
                )}%`,
              }}
              transition={{ duration: 1, delay: 0.7 }}
              className="h-full rounded-full bg-gradient-to-r from-[#C28F49] to-amber-400"
            ></motion.div>
          </div>
          <p className="text-amber-400 text-sm mt-1">
            {(
              userData.freemiumLimits.pointsFor100 - userData.totalPoints
            ).toLocaleString()}{" "}
            points to go
          </p>
        </div>
      </motion.div>

      {/* Dynamic Tier Details Section */}
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-5"
      >
        <div className="flex justify-between">
          <h3 className="text-gray-400 text-sm">{currentTier} Details</h3>
          <div className="p-2 rounded-lg bg-gray-700">
            <Award size={18} className="text-[#C28F49]" />
          </div>
        </div>
        <p className="text-xl font-bold mt-2">Points Limits</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center text-gray-300">
            <CheckCircle
              size={14}
              className="text-[#2D9642] mr-2 flex-shrink-0"
            />
            <span>
              Monthly: {tierInfo.maxPointsPerMonth.toLocaleString()} points
            </span>
          </div>
          <div className="flex items-center text-gray-300">
            <CheckCircle
              size={14}
              className="text-[#2D9642] mr-2 flex-shrink-0"
            />
            <span>
              Yearly: {tierInfo.maxPointsPerYear.toLocaleString()} points
            </span>
          </div>
          <div className="flex items-center text-gray-300">
            <CheckCircle
              size={14}
              className="text-[#2D9642] mr-2 flex-shrink-0"
            />
            <span>
              {tierInfo.expirationMonths === 0
                ? "Points never expire"
                : `Points expire in ${tierInfo.expirationMonths} months`}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
