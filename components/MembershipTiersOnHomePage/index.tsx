"use client";
import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Check,
  Award,
  Gift,
  Briefcase,
  Coffee,
  Plane,
  Sparkle,
  Clock,
  Shield,
  Zap,
  Star,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserProfile } from "@/app/hooks/useProfile";
import { useRouter } from "next/navigation";

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

type PricingCardProps = {
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
  pointsFor100: number;
  maxMonthlyPoints: number;
  maxAnnualPoints: number;
  expiration: string;
  recommended?: boolean;
  selected?: boolean;
  isCurrentPlan?: boolean;
  onSelect: () => void;
  annualBilling: boolean;
  disabled?: boolean;
};

type Tier = {
  name: string;
  price: number;
};

type ComingSoonValue = {
  value: string | boolean;
  comingSoon: boolean;
};

type TableFeature = {
  name: string;
  tiers: (boolean | string | ComingSoonValue)[];
};

type FeatureCategory = {
  name: string;
  features: TableFeature[];
};

type FAQItem = {
  question: string;
  answer: string;
};

const MembershipTiersOnHomePage: React.FC = () => {
  const router = useRouter();
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useUserProfile();

  // Default to monthly, will be updated with user preference from profile hook
  const [annualBilling, setAnnualBilling] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [animateBackground, setAnimateBackground] = useState<boolean>(false);

  // Set the billing cycle based on user profile
  useEffect(() => {
    if (profileData && profileData.billingCycle) {
      setAnnualBilling(profileData.billingCycle === "annual");
    }
  }, [profileData]);

  // Set selected tier based on user profile
  useEffect(() => {
    if (profileData && profileData.membershipTier) {
      setSelectedTier(profileData.membershipTier);
    }
  }, [profileData]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Trigger background animation on mount
  useEffect(() => {
    if (isMounted) {
      setAnimateBackground(true);
    }
  }, [isMounted]);

  // Handle tier selection
  const handleSelectTier = (tierName: string): void => {
    if (tierName !== "Freemium" && !profileData?.membershipTier) return; // Only allow upgrading if already a member
    setSelectedTier(tierName);
    setTimeout(() => {
      router.push("/membership-tiers");
    }, 1000);
  };

  // Handle billing cycle toggle
  const handleBillingToggle = () => {
    setAnnualBilling(!annualBilling);
    // Here you would typically call an API to update the user's billing cycle
  };

  return (
    <div className="relative overflow-hidden min-h-screen p-6 pt-24 font-sans text-gray-800 bg-[#F2F2F0]">
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animateBackground ? 0.05 : 0 }}
            transition={{ duration: 2 }}
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
            style={{
              background: `radial-gradient(circle, #2D9642 0%, rgba(45, 150, 66, 0) 70%)`,
              filter: "blur(50px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animateBackground ? 0.05 : 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, #C28F49 0%, rgba(194, 143, 73, 0) 70%)`,
              filter: "blur(50px)",
            }}
          />

          {/* Floating particles */}
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              initial={{
                opacity: 0,
                x: Math.random() * window?.innerWidth,
                y: Math.random() * window?.innerHeight,
                scale: 0.2 + Math.random() * 0.8,
              }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                y: ["-10%", "10%", "-10%"],
                x: [
                  index % 2 === 0 ? "-5%" : "5%",
                  index % 2 === 0 ? "5%" : "-5%",
                  index % 2 === 0 ? "-5%" : "5%",
                ],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                width: 20 + Math.random() * 80,
                height: 20 + Math.random() * 80,
                background: index % 2 === 0 ? "#2D9642" : "#C28F49",
                filter: "blur(50px)",
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Choose Your Paylinq Membership
            </h1>
          </motion.div>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Select the plan that best fits your lifestyle and financial goals
          </motion.p>

          {profileData?.membershipTier && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                Your Current Plan: {profileData.membershipTier}
              </span>
            </motion.div>
          )}

          {/* Billing Toggle */}
          {selectedTier?.toLowerCase() === "freemium" ? null : (
            <motion.div
              className="mt-8 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span
                className={`mr-3 text-sm font-medium ${
                  !annualBilling ? "text-green-700" : "text-gray-500"
                }`}
              >
                Monthly
              </span>
              <button
                className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: annualBilling
                    ? "rgba(45, 150, 66, 0.2)"
                    : "rgba(194, 143, 73, 0.2)",
                }}
                onClick={handleBillingToggle}
              >
                <motion.span
                  className="inline-block h-6 w-6 transform rounded-full shadow-md"
                  animate={{
                    translateX: annualBilling ? "37px" : "1px",
                    backgroundColor: annualBilling ? "#2D9642" : "#C28F49",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span
                className={`ml-3 text-sm font-medium ${
                  annualBilling ? "text-green-700" : "text-gray-500"
                }`}
              >
                Annually{" "}
                <span className="text-amber-600 font-bold">(Save 15%)</span>
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Freemium Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PricingCard
              tierName="Freemium"
              tagline="Start your journey"
              price={0}
              color="bg-gray-50"
              accentColor="border-green-300"
              buttonColor="bg-linear-to-r from-[#2D9642] to-[#38b053]"
              buttonHoverColor="bg-linear-to-r from-[#27833a] to-[#319745]"
              textColor="text-green-700"
              icon={<CreditCard className="h-8 w-8 text-[#2D9642]" />}
              features={[
                {
                  icon: <CreditCard size={18} />,
                  text: "Paylinq Reward Debit Card",
                },
                {
                  icon: <Award size={18} />,
                  text: "Loyalty Rewards Program",
                  comingSoon: true,
                },
                {
                  icon: <Plane size={18} />,
                  text: "Travel Benefits",
                  comingSoon: true,
                },
                {
                  icon: <Briefcase size={18} />,
                  text: "Hotel Partner Benefits",
                  comingSoon: true,
                },
              ]}
              rewards={[
                { category: "Everyday Purchases", points: 1 },
                { category: "Dining", points: 2 },
                { category: "Travel", points: 2 },
              ]}
              pointsFor100={20000}
              maxMonthlyPoints={10000}
              maxAnnualPoints={120000}
              expiration="18 months"
              recommended={true}
              selected={selectedTier?.toLocaleLowerCase() === "freemium"}
              isCurrentPlan={profileData?.membershipTier.toLowerCase() === "freemium"}
              onSelect={() => handleSelectTier("Freemium")}
              annualBilling={annualBilling}
            />
          </motion.div>

          {/* Lifestyle Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PricingCard
              tierName="Lifestyle"
              tagline="Enhance your rewards"
              price={20}
              color="bg-green-50"
              accentColor="border-green-400"
              buttonColor="bg-linear-to-r from-[#2D9642] to-[#38b053]"
              buttonHoverColor="bg-linear-to-r from-[#27833a] to-[#319745]"
              textColor="text-green-700"
              icon={<Coffee className="h-8 w-8 text-[#2D9642]" />}
              features={[
                {
                  icon: <CreditCard size={18} />,
                  text: "All Freemium Features",
                },
                { icon: <Zap size={18} />, text: "Exclusive Deals & Insights" },
                {
                  icon: <Award size={18} />,
                  text: "Full Loyalty Program Access",
                },
                { icon: <Plane size={18} />, text: "Premium Travel Benefits" },
              ]}
              rewards={[
                { category: "Everyday Purchases", points: 2 },
                { category: "Dining", points: 3 },
                { category: "Travel", points: 3 },
              ]}
              pointsFor100={10000}
              maxMonthlyPoints={20000}
              maxAnnualPoints={240000}
              expiration="24 months"
              selected={selectedTier?.toLowerCase() === "lifestyle"}
              isCurrentPlan={profileData?.membershipTier.toLowerCase() === "lifestyle"}
              onSelect={() => handleSelectTier("Lifestyle")}
              annualBilling={annualBilling}
              disabled={profileData?.membershipTier !== "Lifestyle"}
            />
          </motion.div>

          {/* VIP Lifestyle Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PricingCard
              tierName="VIP Lifestyle"
              tagline="Premium experience"
              price={50}
              color="bg-amber-50"
              accentColor="border-amber-400"
              buttonColor="bg-linear-to-r from-[#C28F49] to-[#d9a55c]"
              buttonHoverColor="bg-linear-to-r from-[#b3813f] to-[#c79652]"
              textColor="text-amber-700"
              icon={<Gift className="h-8 w-8 text-[#C28F49]" />}
              features={[
                {
                  icon: <CreditCard size={18} />,
                  text: "All Lifestyle Features",
                },
                { icon: <Zap size={18} />, text: "Priority Customer Support" },
                {
                  icon: <Award size={18} />,
                  text: "VIP Events & Birthday Gift",
                },
                {
                  icon: <Briefcase size={18} />,
                  text: "Financial Advice Sessions",
                },
                { icon: <Plane size={18} />, text: "Premium Lounge Access" },
              ]}
              rewards={[
                { category: "Everyday Purchases", points: 3 },
                { category: "Dining", points: 4 },
                { category: "Travel", points: 4 },
              ]}
              pointsFor100={6667}
              maxMonthlyPoints={30000}
              maxAnnualPoints={360000}
              expiration="36 months"
              selected={selectedTier?.toLowerCase() === "vip lifestyle"}
              isCurrentPlan={profileData?.membershipTier.toLowerCase() === "vip lifestyle"}
              onSelect={() => handleSelectTier("VIP Lifestyle")}
              annualBilling={annualBilling}
              disabled={profileData?.membershipTier.toLowerCase() !== "vip lifestyle"}
            />
          </motion.div>

          {/* Elite Lifestyle Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <PricingCard
              tierName="Elite Lifestyle"
              tagline="Luxury redefined"
              price={75}
              color="bg-amber-50"
              accentColor="border-amber-400"
              buttonColor="bg-linear-to-r from-[#C28F49] to-[#d9a55c]"
              buttonHoverColor="bg-linear-to-r from-[#b3813f] to-[#c79652]"
              textColor="text-amber-700"
              icon={<Sparkle className="h-8 w-8 text-[#C28F49]" />}
              features={[
                {
                  icon: <CreditCard size={18} />,
                  text: "All VIP Lifestyle Features",
                },
                {
                  icon: <Plane size={18} />,
                  text: "Luxury Travel Experiences",
                },
                { icon: <Star size={18} />, text: "Dedicated Account Manager" },
                { icon: <Zap size={18} />, text: "24/7 Concierge Services" },
                { icon: <Award size={18} />, text: "Exclusive VIP Events" },
              ]}
              rewards={[
                { category: "Everyday Purchases", points: 5 },
                { category: "Dining", points: 5 },
                { category: "Travel", points: 5 },
              ]}
              pointsFor100={5000}
              maxMonthlyPoints={50000}
              maxAnnualPoints={600000}
              expiration="Never expires"
              selected={selectedTier === "Elite Lifestyle"}
              isCurrentPlan={profileData?.membershipTier === "Elite Lifestyle"}
              onSelect={() => handleSelectTier("Elite Lifestyle")}
              annualBilling={annualBilling}
              disabled={profileData?.membershipTier !== "Elite Lifestyle"}
            />
          </motion.div>
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <FeatureComparisonTable
            annualBilling={annualBilling}
            currentTier={profileData?.membershipTier || null}
          />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <FAQSection />
        </motion.div>
      </div>
    </div>
  );
};

// TODO BREAK THIS OUT
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
  pointsFor100,
  maxMonthlyPoints,
  maxAnnualPoints,
  expiration,
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
              <span className="text-gray-600">$100 Redemption</span>
              <span className="font-semibold">
                {pointsFor100.toLocaleString()} points
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
                className="flex items-start"
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
                <div>
                  <span className="text-sm text-gray-600">{feature.text}</span>
                  {feature.comingSoon && (
                    <span className="text-xs text-amber-600 block">
                      Coming soon
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className={`border-t ${accentColor} pt-4 mb-6 flex-grow`}>
          <h4 className={`font-semibold mb-2 ${textColor}`}>Point Limits</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Monthly Maximum</span>
              <span className="font-semibold">
                {maxMonthlyPoints.toLocaleString()} points
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Annual Maximum</span>
              <span className="font-semibold">
                {maxAnnualPoints.toLocaleString()} points
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Expiration</span>
              <span className="font-semibold">{expiration}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={onSelect}
          disabled={disabled}
          className={`w-full ${buttonColor} text-white font-semibold mb-8 py-3 px-4 rounded-lg transition-all duration-300 mt-auto ${
            disabled ? "opacity-70 cursor-not-allowed" : ""
          }`}
          whileHover={{
            background: !disabled ? buttonHoverColor : buttonColor,
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
            : tierName === "Freemium"
            ? "Get Started Free"
            : `Upgrade to ${tierName}`}
        </motion.button>
      </div>
    </motion.div>
  );
};

// Feature Comparison Table Component
const FeatureComparisonTable: React.FC<{
  annualBilling: boolean;
  currentTier: string | null;
}> = ({ annualBilling, currentTier }) => {
  const tiers: Tier[] = [
    { name: "Freemium", price: 0 },
    { name: "Lifestyle", price: 20 },
    { name: "VIP Lifestyle", price: 50 },
    { name: "Elite Lifestyle", price: 75 },
  ];

  const featureCategories: FeatureCategory[] = [
    {
      name: "Card Benefits",
      features: [
        { name: "Paylinq Reward Debit Card", tiers: [true, true, true, true] },
        {
          name: "Digital Card",
          tiers: [{ value: true, comingSoon: true }, true, true, true],
        },
        {
          name: "Priority Customer Support",
          tiers: [false, false, true, true],
        },
        {
          name: "Dedicated Account Manager",
          tiers: [false, false, false, true],
        },
      ],
    },
    {
      name: "Financial Tools",
      features: [
        { name: "Financial Insights", tiers: [false, true, true, true] },
        {
          name: "Financial Education Resources",
          tiers: [false, true, true, true],
        },
        {
          name: "Financial Advice Sessions",
          tiers: [false, false, true, true],
        },
      ],
    },
    {
      name: "Travel & Lifestyle",
      features: [
        {
          name: "Loyalty Program Access",
          tiers: [
            { value: "Basic", comingSoon: true },
            "Full",
            "Premium",
            "Premium",
          ],
        },
        {
          name: "Travel Benefits",
          tiers: [
            { value: "Economy", comingSoon: true },
            "Standard Travel Benefits",
            "Premium Travel Benefits",
            "Luxury Travel Benefits",
          ],
        },
        {
          name: "Hotel Partners",
          tiers: [
            { value: "Standard", comingSoon: true },
            "Standard Hotels",
            "Premium Hotels",
            "Luxury Hotels",
          ],
        },
        {
          name: "Lounge Access",
          tiers: [false, false, "Premium Lounges", "Exclusive Lounges"],
        },
      ],
    },
    {
      name: "VIP Benefits",
      features: [
        { name: "VIP Events", tiers: [false, false, true, "Exclusive VIP"] },
        { name: "Birthday Gift", tiers: [false, false, true, true] },
        { name: "Concierge Services", tiers: [false, false, false, "24/7"] },
        {
          name: "Luxury Experiences",
          tiers: [false, false, false, true],
        },
      ],
    },
  ];

  return (
    <div className="bg-[#F2F2F0] rounded-2xl shadow-lg overflow-hidden mb-16">
      <div
        className="p-6 border-b"
        style={{
          background:
            "linear-gradient(135deg, rgba(45, 150, 66, 0.05) 0%, rgba(194, 143, 73, 0.05) 100%)",
        }}
      >
        <h2 className="text-2xl font-bold text-gray-900">Feature Comparison</h2>
        <p className="text-gray-600 mt-1">
          Compare all features across our membership tiers
        </p>
        <div className="mt-3 text-sm flex items-center text-amber-600">
          <motion.span
            className="inline-block w-3 h-3 bg-amber-100 border border-amber-300 rounded-full mr-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          ></motion.span>
          Features with a dot indicator are coming soon
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              style={{
                background:
                  "linear-gradient(135deg, rgba(45, 150, 66, 0.05) 0%, rgba(194, 143, 73, 0.05) 100%)",
              }}
            >
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 w-1/5">
                Feature
              </th>
              {tiers.map((tier, index) => {
                const annualPrice = Math.ceil(tier.price * 12 * 0.85);
                const priceDisplay =
                  tier.price === 0
                    ? "Free"
                    : `${annualBilling ? annualPrice : tier.price}${
                        annualBilling ? "/year" : "/month"
                      }`;
                const isAvailable = tier.name === "Freemium";
                const isCurrentTier = tier.name === currentTier;

                return (
                  <th
                    key={index}
                    className={`py-4 px-6 text-center text-sm font-semibold ${
                      isCurrentTier ? "bg-green-50" : ""
                    } w-1/5`}
                  >
                    <div className="relative">
                      {isCurrentTier && (
                        <motion.div
                          className="absolute -top-4 left-0 right-0 mx-auto text-xs font-bold text-green-700 bg-green-100 rounded-t-lg py-1 px-2 w-fit"
                          // animate={{ y: [0, -3, 0] }}
                          // transition={{
                          //   duration: 2,
                          //   repeat: Infinity,
                          //   repeatDelay: 3,
                          // }}
                        >
                          CURRENT PLAN
                        </motion.div>
                      )}
                      <span className="block text-lg font-bold text-gray-900 leading-6">
                        {tier.name}
                      </span>
                      <span className="text-base">{priceDisplay}</span>
                      {!isAvailable && tier.name !== currentTier && (
                        <motion.span
                          className="inline-block mt-1 px-2 py-1 text-xs rounded-full"
                          style={{
                            background: "rgba(45, 150, 66, 0.1)",
                            color: "#2D9642",
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          Coming Soon
                        </motion.span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {featureCategories.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr className="bg-linear-to-r from-green-50 to-amber-50">
                  <td colSpan={5} className="py-3 px-6 font-bold text-gray-800">
                    {category.name}
                  </td>
                </tr>
                {category.features.map((feature, featureIndex) => (
                  <motion.tr
                    key={featureIndex}
                    className="border-t"
                    whileHover={{ backgroundColor: "rgba(45, 150, 66, 0.03)" }}
                  >
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {feature.name}
                    </td>
                    {feature.tiers.map((value, tierIndex) => {
                      const isCurrentTierCell =
                        tiers[tierIndex].name === currentTier;

                      return (
                        <td
                          key={tierIndex}
                          className={`py-4 px-6 text-center text-sm ${
                            isCurrentTierCell ? "bg-green-50" : ""
                          }`}
                        >
                          {typeof value === "boolean" ? (
                            value ? (
                              <motion.div
                                whileHover={{ scale: 1.2 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 10,
                                }}
                              >
                                <Check className="mx-auto h-5 w-5 text-green-500" />
                              </motion.div>
                            ) : (
                              <span className="block mx-auto h-5 w-5 text-gray-300">
                                —
                              </span>
                            )
                          ) : typeof value === "object" ? (
                            <motion.div
                              className="relative inline-flex items-center justify-center"
                              whileHover={{ scale: 1.05 }}
                            >
                              <span className="text-gray-700 font-medium">
                                {value.value}
                              </span>
                              <motion.span
                                className="absolute -top-1 right-[-10px] w-2 h-2 bg-amber-400 rounded-full"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              ></motion.span>
                            </motion.div>
                          ) : (
                            <span className="text-gray-700 font-medium">
                              {value}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// FAQ Section Component
const FAQSection: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number): void => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "How do I redeem my Paylinq Reward points?",
      answer:
        "You can redeem your Paylinq Reward points through our mobile app or web portal. Simply navigate to the Rewards section, select 'Redeem Points', and choose from options including gift cards, travel bookings, or merchandise.",
    },
    {
      question: "Can I upgrade my membership tier at any time?",
      answer:
        "Currently, only the Freemium tier is available. We're working hard to launch our premium tiers soon! Once available, you'll be able to upgrade your membership tier at any time through your account settings.",
    },
    {
      question: "Do unused points roll over to the next month?",
      answer:
        "Yes, unused points remain in your account until they reach their expiration date, which varies by tier (18 months for Freemium, 24 months for Lifestyle, 36 months for VIP Lifestyle, and no expiration for Elite Lifestyle).",
    },
    {
      question: "How does credit reporting work with Paylinq?",
      answer:
        "Credit reporting is coming soon to Paylinq! When available, we'll report your payments to major credit bureaus to help build your credit history. The number of accounts you can report will vary by membership tier.",
    },
    {
      question: "What is the Loyalty Program?",
      answer:
        "Our Loyalty Program is an exclusive marketplace that will offer special deals and discounts from partner merchants. This feature is coming soon, and access and available offers will vary by membership tier, with premium tiers enjoying exclusive high-value offers.",
    },
  ];

  return (
    <div className="bg-[#F2F2F0] rounded-2xl shadow-lg overflow-hidden mb-16">
      <div
        className="p-6 border-b"
        style={{
          background:
            "linear-gradient(135deg, rgba(194, 143, 73, 0.05) 0%, rgba(45, 150, 66, 0.05) 100%)",
        }}
      >
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-1">
          Find answers to common questions about our membership tiers
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.button
                className="flex justify-between items-center w-full text-left focus:outline-hidden group"
                onClick={() => toggleItem(index)}
                whileHover={{ x: 3 }}
              >
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                  {faq.question}
                </h3>
                <div
                  className="ml-6 shrink-0 text-gray-500"
                  style={{ color: openItem === index ? "#2D9642" : "#6B7280" }}
                >
                  <motion.div
                    animate={{ rotate: openItem === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </div>
              </motion.button>
              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    className="mt-3 text-base text-gray-600"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div
        className="h-2"
        style={{
          background: "linear-gradient(90deg, #2D9642 0%, #C28F49 100%)",
        }}
      ></div>
    </div>
  );
};

export default MembershipTiersOnHomePage;
