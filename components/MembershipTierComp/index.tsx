"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Award,
  Gift,
  Coffee,
  Sparkle,
  Shield,
  CheckCircle,
  ArrowLeft,
  Check,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useUserProfile,
  useUpdateMembershipTier,
} from "@/app/hooks/useProfile";
import {
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import TierConfirmationModal from "@/components/TierConfirmationModal";
import PricingCard from "@/components/shared/PricingCard";

// Membership tier data
const membershipTiers = [
  {
    id: "white",
    name: "White",
    tagline: "Start your journey",
    price: 0,
    color: "bg-gray-50",
    accentColor: "border-green-300",
    buttonColor: "from-[#2D9642] to-[#38b053]",
    buttonHoverColor: "from-[#27833a] to-[#319745]",
    textColor: "text-[#2D9642]",
    icon: <CreditCard className="h-8 w-8 text-[#2D9642]" />,
    features: [
      {
        icon: <CreditCard size={18} />,
        text: "PayLinq Reward Debit Card",
        comingSoon: true,
      },
      {
        icon: <Award size={18} />,
        text: "Loyalty Rewards Program",
        comingSoon: true,
      },
      {
        icon: <Sparkle size={18} />,
        text: "AI Powered Shopping Assistant",
        comingSoon: true,
      },
      {
        icon: <Gift size={18} />,
        text: "Referral Bonus Program",
        comingSoon: true,
      },
    ],
    rewards: [
      { category: "Everyday Purchases", points: 1 },
    ],
    pointsFor10: 1000,
    redemptionValue: 10,
    maxMonthlyPoints: 10000,
    maxAnnualPoints: 120000,
  },
  {
    id: "silver",
    name: "Silver",
    tagline: "Enhance your rewards",
    price: 10,
    color: "bg-green-50",
    accentColor: "border-green-400",
    buttonColor: "from-[#2D9642] to-[#38b053]",
    buttonHoverColor: "from-[#27833a] to-[#319745]",
    textColor: "text-[#2D9642]",
    icon: <Coffee className="h-8 w-8 text-[#2D9642]" />,
    features: [
      {
        icon: <Check size={18} />,
        text: "Everything in White",
      },
      {
        icon: <Clock size={18} />,
        text: "",
        comingSoon: true,
      },
    ],
    rewards: [
      { category: "Everyday Purchases", points: 1 },
    ],
    pointsFor10: 1000,
    redemptionValue: 12.50,
    maxMonthlyPoints: 20000,
    maxAnnualPoints: 240000,
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Premium experience",
    price: 30,
    color: "bg-amber-50",
    accentColor: "border-amber-400",
    buttonColor: "from-[#C28F49] to-[#d9a55c]",
    buttonHoverColor: "from-[#b3813f] to-[#c79652]",
    textColor: "text-amber-700",
    icon: <Gift className="h-8 w-8 text-[#C28F49]" />,
    features: [
      {
        icon: <Check size={18} />,
        text: "Everything in Silver",
      },
      {
        icon: <Clock size={18} />,
        text: "",
        comingSoon: true,
      },
    ],
    rewards: [
      { category: "Everyday Purchases", points: 1 },
    ],
    pointsFor10: 1000,
    redemptionValue: 17.50,
    maxMonthlyPoints: 30000,
    maxAnnualPoints: 360000,
  },
  {
    id: "black",
    name: "Black",
    tagline: "Luxury redefined",
    price: 50,
    color: "bg-amber-50",
    accentColor: "border-amber-400",
    buttonColor: "from-[#C28F49] to-[#d9a55c]",
    buttonHoverColor: "from-[#b3813f] to-[#c79652]",
    textColor: "text-amber-700",
    icon: <Sparkle className="h-8 w-8 text-[#C28F49]" />,
    features: [
      {
        icon: <Check size={18} />,
        text: "Everything in Gold",
      },
      {
        icon: <Clock size={18} />,
        text: "",
        comingSoon: true,
      },
    ],
    rewards: [
      { category: "Everyday Purchases", points: 1 },
    ],
    pointsFor10: 1000,
    redemptionValue: 20,
    maxMonthlyPoints: 50000,
    maxAnnualPoints: 600000,
  },
];

const MembershipTierComp = () => {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [annualBilling, setAnnualBilling] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [confirmingTier, setConfirmingTier] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Animation states
  const [isMounted, setIsMounted] = useState(false);
  const [animateBackground, setAnimateBackground] = useState(false);

  // Fetch user profile
  const { data: profileData, isLoading: isProfileLoading } = useUserProfile();
  const hasPlan = profileData?.membershipTier !== "White";

  // Mutation to update membership tier
  const { mutate: updateTier, isPending: isUpdating } =
    useUpdateMembershipTier();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set current tier as selected when profile loads
  useEffect(() => {
    if (profileData?.membershipTier) {
      // Find the tier ID that matches the user's current tier name
      const currentTierId = membershipTiers.find(
        (tier) => tier.name === profileData.membershipTier
      )?.id;

      if (currentTierId) {
        setSelectedTier(currentTierId);
      }
    }
    if (profileData?.billingCycle === "annual") {
      setAnnualBilling(true);
    }
  }, [profileData]);

  // Trigger background animation on mount
  useEffect(() => {
    if (isMounted) {
      setAnimateBackground(true);
    }
  }, [isMounted]);

  // Handle tier selection
  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId);
    setConfirmingTier(false);
  };

  const handleConfirmTier = () => {
    if (!selectedTier) return;
    setIsConfirmModalOpen(true);
  };

  const handleUpgradeTier = () => {
    if (!selectedTier) return;

    const selectedTierDetails = membershipTiers.find(
      (tier) => tier.id === selectedTier
    );

    if (selectedTierDetails) {
      updateTier(
        { tierName: selectedTierDetails.name, annualBilling },
        {
          onSuccess: () => {
            const isWhite = selectedTier.toLowerCase() === "white";
            const successText = isWhite
              ? `You're now a ${selectedTierDetails.name} member!`
              : `You've successfully upgraded to the ${selectedTierDetails.name} tier!`;

            setSuccessMessage(successText);

            // Reset confirmation after 3 seconds and redirect to dashboard
            setTimeout(() => {
              setIsConfirmModalOpen(false);
              setSuccessMessage("");
              router.push("/user/dashboard");
            }, 1000);
          },
        }
      );
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen p-6 pt-16 font-sans text-gray-800 bg-[#F2F2F0]">
      {/* Animated background elements */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

          {/* Cute little floating particles */}
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
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back</span>
          </motion.button>

          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-[#2D9642] mr-2" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2D9642] to-[#C28F49]">
              PayLinq
            </span>
          </div>
        </motion.div>

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
              Choose Your PayLinq Membership
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

          {/* Billing Toggle */}
          {selectedTier?.toLocaleLowerCase() === "white" ? null : (
            <motion.div
              className="mt-8 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span
                className={`mr-3 text-sm font-medium ${!annualBilling ? "text-green-700" : "text-gray-500"
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
                onClick={() => setAnnualBilling(!annualBilling)}
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
                className={`ml-3 text-sm font-medium ${annualBilling ? "text-green-700" : "text-gray-500"
                  }`}
              >
                Annually{" "}
                <span className="text-amber-600 font-bold">
                  ({`Sav${hasPlan ? "ing" : "e"} 15%`})
                </span>
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-0 right-0 z-50 mx-auto max-w-md bg-white rounded-lg shadow-xl border border-green-200 p-4"
            >
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <p className="text-gray-700">{successMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <PricingCard
                tierName={tier.name}
                tagline={tier.tagline}
                price={tier.price}
                color={tier.color}
                accentColor={tier.accentColor}
                buttonColor={tier.buttonColor}
                buttonHoverColor={tier.buttonHoverColor}
                textColor={tier.textColor}
                icon={tier.icon}
                features={tier.features}
                rewards={tier.rewards}
                pointsFor10={tier.pointsFor10}
                redemptionValue={tier.redemptionValue}
                maxMonthlyPoints={tier.maxMonthlyPoints}
                maxAnnualPoints={tier.maxAnnualPoints}
                recommended={tier.name === "White"}
                selected={selectedTier === tier.id}
                isCurrentPlan={profileData?.membershipTier === tier.name}
                onSelect={() => handleSelectTier(tier.id)}
                annualBilling={annualBilling}
                // Only enable White for now (or already selected tier)
                // ONLY FOR DEV PURPOSES
                disabled={false}
              // disabled={tier.id !== "white" && tier.id !== selectedTier}
              />
            </motion.div>
          ))}
        </div>

        {/* Confirm Button */}
        {selectedTier && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirmTier}
              disabled={isUpdating}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#2D9642] to-[#C28F49] text-white font-semibold text-lg shadow-lg"
            >
              <SignedOut>
                <SignInButton forceRedirectUrl={"/membership-tiers"}>
                  Join Waitlist
                </SignInButton>
              </SignedOut>
              <SignedIn>
                {isUpdating ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : selectedTier === "white" ? (
                  "Get Membership"
                ) : (
                  "Upgrade Membership"
                )}
              </SignedIn>
            </motion.button>
          </motion.div>
        )}

        {/* Footer with Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>
            Current membership:{" "}
            {profileData?.membershipTier || "No active membership"}
          </p>
          <p className="mt-2">
            Need help choosing? Contact our support team at support@paylinq.com
          </p>
        </motion.div>
      </div>
      {selectedTier && (
        <TierConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleUpgradeTier}
          tierName={
            membershipTiers.find((tier) => tier.id === selectedTier)?.name || ""
          }
          price={
            membershipTiers.find((tier) => tier.id === selectedTier)?.price || 0
          }
          isAnnual={annualBilling}
          isPending={isUpdating}
          isFreemium={selectedTier === "white"}
        />
      )}
    </div>
  );
};

export default MembershipTierComp;
