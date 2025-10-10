"use client";
import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Award,
  Gift,
  Coffee,
  Sparkle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Bot,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserProfile } from "@/app/hooks/useProfile";
import { useRouter } from "next/navigation";
import PricingCard from "@/components/shared/PricingCard";

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
    if (tierName !== "White" && !profileData?.membershipTier) return; // Only allow upgrading if already a member
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
    <div id="membershipSection" className="relative overflow-hidden min-h-screen p-6 pt-24 font-sans text-gray-800 bg-[#F2F2F0]">
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
          {selectedTier?.toLowerCase() === "white" ? null : (
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
          {/* White Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PricingCard
              tierName="White"
              tagline="Start your journey"
              price={10}
              color="bg-gray-50"
              accentColor="border-green-300"
              buttonColor="bg-linear-to-r from-[#2D9642] to-[#38b053]"
              buttonHoverColor="bg-linear-to-r from-[#27833a] to-[#319745]"
              textColor="text-green-700"
              icon={<CreditCard className="h-8 w-8 text-[#2D9642]" />}
              features={[
                {
                  icon: <CreditCard size={18} />,
                  text: "PayLinq Reward Debit Card",
                  comingSoon: true
                },
                {
                  icon: <Award size={18} />,
                  text: "Loyalty Rewards Program",
                  comingSoon: true,
                },
                {
                  icon: <Bot size={18} />,
                  text: "AI Powered Shopping Assistant",
                  comingSoon: true,
                },
                {
                  icon: <Gift size={18} />,
                  text: "Referral Bonus Program",
                  comingSoon: true,
                },
              ]}
              rewards={[
                { category: "Everyday Purchases", points: 1 },
              ]}
              pointsFor10={1000}
              redemptionValue={10}
              maxMonthlyPoints={10000}
              maxAnnualPoints={120000}
              recommended={true}
              selected={selectedTier?.toLocaleLowerCase() === "white"}
              isCurrentPlan={profileData?.membershipTier?.toLowerCase() === "white"}
              onSelect={() => handleSelectTier("White")}
              annualBilling={annualBilling}
            />
          </motion.div>

          {/* Silver Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PricingCard
              tierName="Silver"
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
                  icon: <Check size={18} />,
                  text: "Everything in White",
                },
                {
                  icon: <Clock size={18} />,
                  text: "",
                  comingSoon: true,
                },
              ]}
              rewards={[
                { category: "Everyday Purchases", points: 1 },
              ]}
              pointsFor10={1000}
              redemptionValue={12.50}
              maxMonthlyPoints={20000}
              maxAnnualPoints={240000}
              selected={selectedTier?.toLowerCase() === "silver"}
              isCurrentPlan={profileData?.membershipTier?.toLowerCase() === "silver"}
              onSelect={() => handleSelectTier("Silver")}
              annualBilling={annualBilling}
            />
          </motion.div>

          {/* Gold Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PricingCard
              tierName="Gold"
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
                  icon: <Check size={18} />,
                  text: "Everything in Silver",
                },
                {
                  icon: <Clock size={18} />,
                  text: "",
                  comingSoon: true,
                },
              ]}
              rewards={[
                { category: "Everyday Purchases", points: 1 },
              ]}
              pointsFor10={1000}
              redemptionValue={17.50}
              maxMonthlyPoints={30000}
              maxAnnualPoints={360000}
              selected={selectedTier?.toLowerCase() === "gold"}
              isCurrentPlan={profileData?.membershipTier?.toLowerCase() === "gold"}
              onSelect={() => handleSelectTier("Gold")}
              annualBilling={annualBilling}
            />
          </motion.div>

          {/* Black Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <PricingCard
              tierName="Black"
              tagline="Luxury redefined"
              price={70}
              color="bg-amber-50"
              accentColor="border-amber-400"
              buttonColor="bg-linear-to-r from-[#C28F49] to-[#d9a55c]"
              buttonHoverColor="bg-linear-to-r from-[#b3813f] to-[#c79652]"
              textColor="text-amber-700"
              icon={<Sparkle className="h-8 w-8 text-[#C28F49]" />}
              features={[
                {
                  icon: <Check size={18} />,
                  text: "Everything in Gold",
                },
                {
                  icon: <Clock size={18} />,
                  text: "",
                  comingSoon: true,
                },
              ]}
              rewards={[
                { category: "Everyday Purchases", points: 1 },
              ]}
              pointsFor10={1000}
              redemptionValue={20}
              maxMonthlyPoints={50000}
              maxAnnualPoints={600000}
              selected={selectedTier === "Black"}
              isCurrentPlan={profileData?.membershipTier === "Black"}
              onSelect={() => handleSelectTier("Black")}
              annualBilling={annualBilling}
            />
          </motion.div>
        </div>

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
        "Redeem Paylinq Points directly in the app or web dashboard. Go to Rewards → Redeem, then choose how to use your <strong>Universal Paylinq Points (UPP)</strong>: Shop instantly with participating brands online or in-store, or book travel—flights, hotels, or experiences. Redemptions are instant. No minimum balance required.",
    },
    {
      question: "Can I upgrade my membership tier at any time?",
      answer:
        "Yes. You can upgrade your PayLinq membership tier at any time from your Account → Membership page. When you upgrade: Your new tier benefits activate immediately, any unused rewards or balance carry over, and the new tier fee is prorated based on your billing cycle. You can also downgrade or cancel before your next renewal period.",
    },
    {
      question: "Do unused points roll over to the next month?",
      answer:
        "Yes. Unused PayLinq Reward Points automatically roll over each month and never expire as long as your account remains active. If your membership lapses or is closed, points are held for 90 days and can be reinstated upon reactivation.",
    },
    {
      question: "What is the Loyalty Program?",
      answer:
        "The Paylinq Loyalty Program lets members earn <strong>Universal Paylinq Points (UPP)</strong> on everyday spending. Each purchase made through a Paylinq Reward card or partner brand generates points that can be redeemed like cash—for shopping, travel, or experiences. Members also unlock higher earning rates, exclusive offers, and enhanced redemption values as they move up from White → Silver → Gold → Black tiers.",
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
                    <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
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
