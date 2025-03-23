import { motion } from "framer-motion";
import { ShoppingBag, Utensils, Plane } from "lucide-react";
import { useUserProfile } from "@/app/hooks/useProfile";

// Define tier-specific multipliers
const TIER_MULTIPLIERS = {
  Freemium: {
    everyday: 1,
    dining: 2,
    travel: 2,
    pointsFor100: 20000,
  },
  Lifestyle: {
    everyday: 2,
    dining: 3,
    travel: 3,
    pointsFor100: 10000,
  },
  "VIP Lifestyle": {
    everyday: 3,
    dining: 4,
    travel: 4,
    pointsFor100: 6667,
  },
  "Elite Lifestyle": {
    everyday: 5,
    dining: 5,
    travel: 5,
    pointsFor100: 5000,
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

  // Get current tier with fallback to Freemium
  const currentTier = profileData?.membershipTier || "Freemium";

  // Get multipliers for the current tier
  const multipliers =
    TIER_MULTIPLIERS[currentTier as keyof typeof TIER_MULTIPLIERS] ||
    TIER_MULTIPLIERS.Freemium;

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-gray-700/50 border border-gray-600 h-24"
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
        <h3 className="text-lg font-bold">Your Point Multipliers</h3>
        <span className="text-sm px-3 py-1 rounded-full bg-[#2D9642]/20 text-[#2D9642]">
          {currentTier}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gray-700/50 border border-gray-600">
          <div className="flex items-center mb-3">
            <ShoppingBag size={20} className="text-gray-400 mr-2" />
            <h4 className="font-medium">Everyday Purchases</h4>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {multipliers.everyday}x
          </div>
          <p className="text-gray-400 text-sm">
            {multipliers.everyday} point{multipliers.everyday !== 1 ? "s" : ""}{" "}
            per $1 spent
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gray-700/50 border border-[#2D9642]/30">
          <div className="flex items-center mb-3">
            <Utensils size={20} className="text-[#2D9642] mr-2" />
            <h4 className="font-medium">Dining</h4>
          </div>
          <div className="text-3xl font-bold text-[#2D9642] mb-1">
            {multipliers.dining}x
          </div>
          <p className="text-gray-400 text-sm">
            {multipliers.dining} points per $1 spent
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gray-700/50 border border-[#C28F49]/30">
          <div className="flex items-center mb-3">
            <Plane size={20} className="text-[#C28F49] mr-2" />
            <h4 className="font-medium">Travel</h4>
          </div>
          <div className="text-3xl font-bold text-[#C28F49] mb-1">
            {multipliers.travel}x
          </div>
          <p className="text-gray-400 text-sm">
            {multipliers.travel} points per $1 spent
          </p>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>
          For every {multipliers.pointsFor100.toLocaleString()} points earned,
          you can redeem for $100 in value.
        </p>
      </div>
    </motion.div>
  );
}
