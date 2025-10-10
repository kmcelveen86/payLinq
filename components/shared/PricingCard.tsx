"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";

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

  return (
    <motion.div
      className={`rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 h-full ${
        selected || isCurrentPlan
          ? "ring-2 ring-green-500 scale-[1.02]"
          : "hover:scale-[1.02]"
      } ${color} ${disabled ? "opacity-90" : ""}`}
      whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-7 flex flex-col">
        {recommended && isCurrentPlan ? (
          // Combined banner for both recommended and current plan
          <div
            className="text-white text-center py-1 h-7 font-semibold text-sm flex items-center justify-center"
            style={{
              background: "linear-gradient(90deg, #2D9642 0%, #C28F49 100%)",
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
                style={{ backgroundColor: "#C28F49" }}
              >
                MOST POPULAR
              </div>
            )}
            {isCurrentPlan && !recommended && (
              <div
                className="text-white text-center py-1 h-7 font-semibold text-sm"
                style={{ backgroundColor: "#2D9642" }}
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
            <h3 className="text-xl font-bold text-gray-900">{tierName}</h3>
            <p className="text-sm text-gray-500 mt-1">{tagline}</p>
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
            className="text-4xl font-bold text-gray-900"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {priceDisplay}
          </motion.span>
        </div>

        {/* Rewards Section */}
        <div className={`border-t ${accentColor} pt-4 mb-6`}>
          <h4 className={`font-semibold mb-2 ${textColor}`}>Rewards</h4>
          <ul className="space-y-2">
            {rewards.map((reward, index) => (
              <motion.li
                key={index}
                className="flex justify-between text-sm"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-gray-600">{reward.category}</span>
                <span className="font-semibold">
                  {reward.points} pts per $1
                </span>
              </motion.li>
            ))}
            <motion.li
              className="flex justify-between text-sm"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-gray-600">${redemptionValue.toFixed(2)} Redemption</span>
              <span className="font-semibold">
                {pointsFor10.toLocaleString()} points
              </span>
            </motion.li>
          </ul>
        </div>

        {/* Features List */}
        <div className={`border-t ${accentColor} pt-4 mb-6`}>
          <h4 className={`font-semibold mb-2 ${textColor}`}>Key Features</h4>
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
                  className={`shrink-0 h-5 w-5 mr-2 ${
                    feature.comingSoon ? "text-amber-500" : "text-green-500"
                  }`}
                >
                  {feature.comingSoon ? (
                    <Clock size={18} />
                  ) : (
                    <Check size={18} />
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{feature.text}</span>
                  {feature.comingSoon && (
                    <span className="text-xs text-amber-600">
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
          className={`w-full bg-gradient-to-r ${buttonColor} text-white font-semibold mb-8 py-3 px-4 rounded-lg transition-all duration-300 mt-auto shadow-md hover:shadow-lg ${
            disabled ? "opacity-70 cursor-not-allowed" : ""
          } ${
            selected || isCurrentPlan ? "ring-2 ring-white ring-opacity-70" : ""
          }`}
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
