"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { TIER_COLORS, type TierName } from "@/constants/tierColors";

// Type definitions
type RewardType = {
  category: string;
  points: number;
};

type FeatureType = {
  icon: React.ReactNode;
  text: string;
  comingSoon?: boolean;
};

export type PricingCardProps = {
  tierName: string;
  tagline: string;
  price: number;
  color: string;
  accentColor: string;
  buttonColor: string;
  buttonHoverColor: string;
  textColor: string;
  icon: React.ReactNode;
  features: FeatureType[];
  rewards: RewardType[];
  pointsFor10: number;
  redemptionValue: number;
  maxMonthlyPoints: number;
  maxAnnualPoints: number;
  recommended?: boolean;
  selected?: boolean;
  isCurrentPlan?: boolean;
  onSelect: () => void;
  annualBilling: boolean;
  disabled?: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({
  tierName,
  tagline,
  price,
  color,
  accentColor,
  buttonColor,
  buttonHoverColor,
  textColor,
  icon,
  features,
  rewards,
  pointsFor10,
  redemptionValue,
  maxMonthlyPoints,
  maxAnnualPoints,
  recommended = false,
  selected = false,
  isCurrentPlan = false,
  onSelect,
  annualBilling,
  disabled = false,
}) => {
  const annualPrice = Math.ceil(price * 12 * 0.85); // 15% discount for annual billing
  const currentPrice = annualBilling ? annualPrice : price;
  const priceDisplay =
    currentPrice === 0
      ? "Free"
      : `$${currentPrice}${annualBilling ? "/year" : "/month"}`;

  // Get tier-specific colors
  const tierColors = TIER_COLORS[tierName as TierName] || TIER_COLORS.White;

  // Determine ring color based on tier
  const getRingColor = () => {
    if (tierName === "Gold" || tierName === "Black") return "ring-amber-400";
    return "ring-slate-400";
  };

  return (
    <motion.div
      className={`rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 h-full ${
        selected || isCurrentPlan
          ? `ring-2 ${getRingColor()} scale-[1.02]`
          : "hover:scale-[1.02]"
      } ${tierColors.background} ${tierColors.border} border ${disabled ? "opacity-90" : ""}`}
      whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-7 flex flex-col">
        {recommended && isCurrentPlan ? (
          // Combined banner for both recommended and current plan
          <div
            className="text-white text-center py-1 h-7 font-semibold text-sm flex items-center justify-center"
            style={{
              background: `linear-gradient(90deg, ${tierColors.button.from} 0%, ${tierColors.button.to} 100%)`,
            }}
          >
            <span className="flex items-center">
              <Check size={16} className="mr-1" />
              CURRENT POPULAR PLAN
            </span>
          </div>
        ) : (
          <>
            {/* Separate banners if we needed */}
            {recommended && (
              <div
                className="text-white text-center py-1 h-7 font-semibold text-sm"
                style={{ backgroundColor: tierColors.button.from }}
              >
                MOST POPULAR
              </div>
            )}
            {isCurrentPlan && !recommended && (
              <div
                className="text-white text-center py-1 h-7 font-semibold text-sm"
                style={{ backgroundColor: tierColors.button.from }}
              >
                YOUR CURRENT PLAN
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-6 h-full flex flex-col">
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3
              className="text-xl font-bold"
              style={{ color: tierName === "Black" ? tierColors.text.primary : "#1F2937" }}
            >
              {tierName}
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: tierName === "Black" ? tierColors.text.secondary : "#6B7280" }}
            >
              {tagline}
            </p>
          </div>
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.div>
        </div>

        {/* Price */}
        <div className="mt-6 mb-6">
          <motion.span
            className="text-4xl font-bold"
            style={{ color: tierName === "Black" ? tierColors.text.primary : "#111827" }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {priceDisplay}
          </motion.span>
        </div>

        {/* Rewards Section */}
        <div className="border-t pt-4 mb-6" style={{ borderColor: tierColors.accent }}>
          <h4 className="font-semibold mb-2" style={{ color: tierColors.text.primary }}>Rewards</h4>
          <ul className="space-y-2">
            {rewards.map((reward, index) => (
              <motion.li
                key={index}
                className="flex justify-between text-sm"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <span style={{ color: tierName === "Black" ? tierColors.text.accent : "#4B5563" }}>
                  {reward.category}
                </span>
                <span className="font-semibold" style={{ color: tierName === "Black" ? tierColors.text.accent : "#111827" }}>
                  {reward.points} pts per $1
                </span>
              </motion.li>
            ))}
            <motion.li
              className="flex justify-between text-sm"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <span style={{ color: tierName === "Black" ? tierColors.text.accent : "#4B5563" }}>
                ${redemptionValue.toFixed(2)} Redemption
              </span>
              <span className="font-semibold" style={{ color: tierName === "Black" ? tierColors.text.accent : "#111827" }}>
                {pointsFor10.toLocaleString()} points
              </span>
            </motion.li>
          </ul>
        </div>

        {/* Features List */}
        <div className="border-t pt-4 mb-6" style={{ borderColor: tierColors.accent }}>
          <h4 className="font-semibold mb-2" style={{ color: tierColors.text.primary }}>Key Features</h4>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 3 }}
              >
                <span
                  className="shrink-0 h-5 w-5 mr-2"
                  style={{
                    color: feature.comingSoon
                      ? (tierName === "Black" ? "#F59E0B" : "#F59E0B")
                      : (tierName === "Black" ? tierColors.text.primary : "#10B981")
                  }}
                >
                  {feature.comingSoon ? (
                    <Clock size={18} />
                  ) : (
                    <Check size={18} />
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm"
                    style={{ color: tierName === "Black" ? tierColors.text.accent : "#4B5563" }}
                  >
                    {feature.text}
                  </span>
                  {feature.comingSoon && (
                    <span
                      className="text-xs"
                      style={{ color: tierName === "Black" ? "#FCD34D" : "#D97706" }}
                    >
                      Coming soon
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={onSelect}
          disabled={disabled}
          className={`w-full text-white font-semibold mb-8 py-3 px-4 rounded-lg transition-all duration-300 mt-auto shadow-md hover:shadow-lg ${
            disabled ? "opacity-70 cursor-not-allowed" : ""
          } ${
            selected || isCurrentPlan ? "ring-2 ring-white ring-opacity-70" : ""
          }`}
          style={{
            background: `linear-gradient(to right, ${tierColors.button.from}, ${tierColors.button.to})`,
          }}
          whileHover={{
            scale: !disabled ? 1.03 : 1,
          }}
          whileTap={{ scale: !disabled ? 0.98 : 1 }}
        >
          {isCurrentPlan
            ? `Your Active Plan`
            : selected
            ? "Plan Selected"
            : disabled
            ? "Coming Soon"
            : tierName === "White"
            ? "Get Started"
            : `Upgrade to ${tierName}`}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
