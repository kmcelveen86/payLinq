"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import TopNavComp from "@/components/TopNav/TopNavComp";
import { TIER_COLORS, TierName } from "@/constants/tierColors";
import { Check, Sparkles, Crown, Star, Zap, Loader2, Clock } from "lucide-react";
import { getUserSubscription } from "@/app/actions/subscription";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchStripePrices } from "@/app/api/userService";
import { useSubscriptionStatus } from "@/app/hooks/useProfile";

// Static tier features (these don't come from Stripe)
const TIER_FEATURES: Record<TierName, { tagline: string; features: { text: string, available: boolean }[] }> = {
  White: {
    tagline: "Start your journey",
    features: [
      { text: "1,000 points = $10.00 Redemption", available: true },
      { text: "PayLinq Reward Debit Card (Coming Soon)", available: false },
      { text: "Loyalty Rewards Program (Coming Soon)", available: false },
      { text: "AI Powered Shopping Assistant (Coming Soon)", available: false },
      { text: "Referral Bonus Program (Coming Soon)", available: false },
    ],
  },
  Silver: {
    tagline: "Enhance your rewards",
    features: [
      { text: "1,000 points = $12.50 Redemption", available: false },
      { text: "Everything in White", available: false },
      { text: "Coming Soon", available: false },
    ],
  },
  Gold: {
    tagline: "Premium experience",
    features: [
      { text: "1,000 points = $17.50 Redemption", available: false },
      { text: "Everything in Silver", available: false },
      { text: "Coming Soon", available: false },
    ],
  },
  Black: {
    tagline: "Luxury redefined",
    features: [
      { text: "1,000 points = $20.00 Redemption", available: false },
      { text: "Everything in Gold", available: false },
      { text: "Coming Soon", available: false },
    ],
  },
};

const TIER_ICONS: Record<TierName, React.ReactNode> = {
  White: <Zap className="w-6 h-6" />,
  Silver: <Star className="w-6 h-6" />,
  Gold: <Crown className="w-6 h-6" />,
  Black: <Sparkles className="w-6 h-6" />,
};

interface StripeTier {
  productId: string;
  name: string;
  description: string | null;
  monthlyPrice: number | null;
  monthlyPriceId: string | null;
  yearlyPrice: number | null;
  yearlyPriceId: string | null;
}

export default function PricingPage() {
  const { user, isLoaded } = useUser();
  const queryClient = useQueryClient();
  const [isYearly, setIsYearly] = useState(false);
  // Fetch prices using React Query
  const {
    data: pricesData,
    isLoading: isPricesLoading,
    isError: isPricesError
  } = useQuery({
    queryKey: ["stripePrices"],
    queryFn: fetchStripePrices,
  });

  // Fetch subscription using React Query logic from hook (or directly if hook not avail, but we'll use the hook pattern)
  const {
    data: subscriptionData,
    isLoading: isSubLoading
  } = useSubscriptionStatus();

  // Derived state
  const stripeTiers: StripeTier[] = pricesData?.tiers || [];

  // Ensure White tier is always present at the start
  const whiteTier: StripeTier = {
    productId: 'white-tier',
    name: 'White',
    description: 'Start your journey',
    monthlyPrice: 0,
    monthlyPriceId: null,
    yearlyPrice: 0,
    yearlyPriceId: null
  };

  const tiers = [whiteTier, ...stripeTiers.filter(t => t.name !== 'White')];
  const loading = isPricesLoading || isSubLoading || !isLoaded;
  const error = isPricesError || (pricesData?.error ? pricesData.error : null);

  // Sync subscription data to local state for toggles when data arrives
  useEffect(() => {
    if (subscriptionData) {
      // Normalize tier name to PascalCase to match TierName type (white -> White)
      const rawTier = subscriptionData.tier;
      const normalizedTier = rawTier && rawTier !== 'none'
        ? (rawTier.charAt(0).toUpperCase() + rawTier.slice(1)) as TierName
        : null;

      setCurrentPlan(normalizedTier);

      // Only set yearly if explicit
      setIsYearly(subscriptionData.interval === 'yearly');
    }
  }, [subscriptionData]);

  // Handle payment failure toast
  useEffect(() => {
    // Check for canceled or error query params
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("canceled") || searchParams.get("error")) {
      import("react-hot-toast").then(({ toast }) => {
        toast.error("Payment failed. Please try again.", {
          position: "top-center",
          style: {
            background: "#2C0F0F",
            border: "1px solid #EF4444",
            color: "#F3F4F6",
          },
        });

        // Clean up URL
        window.history.replaceState({}, "", "/pricing");
      });
    }
  }, []);

  // Use state for current plan instead of direct prop access
  const [currentPlan, setCurrentPlan] = useState<TierName | null>(null);
  const [subscribingTier, setSubscribingTier] = useState<TierName | null>(null);

  const getPrice = (tier: StripeTier) => {
    if (isYearly) {
      return tier.yearlyPrice ?? 0;
    }
    return tier.monthlyPrice ?? 0;
  };

  const getSavings = (tier: StripeTier) => {
    if (!tier.monthlyPrice || !tier.yearlyPrice) return 0;
    return tier.monthlyPrice * 12 - tier.yearlyPrice;
  };

  const handleSubscribe = async (tierName: TierName) => {
    // White tier is free, no checkout needed
    if (tierName === "White") {
      if (user) {
        // If user is already on a plan (not White), we need to downgrade
        if (currentPlan !== "White") {
          try {
            await axios.post("/api/stripe/downgrade");
            import("react-hot-toast").then(({ toast }) => {
              toast.success("Plan updated to White");
            });
            // Invalidate queries
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });

            window.location.href = "/user/dashboard";
          } catch (err) {
            console.error("Downgrade failed", err);
            // Fallback redirect even if API fails (or show error? Better to show error but redirecting might be safer for UX flow if just a glitch)
            window.location.href = "/user/dashboard";
          }
        } else {
          // Already White or no plan
          window.location.href = "/user/dashboard";
        }
      } else {
        window.location.href = "/sign-up?redirect_url=/user/dashboard";
      }
      return;
    }

    if (!user) {
      window.location.href = "/sign-up?redirect_url=/pricing";
      return;
    }

    setSubscribingTier(tierName);

    try {
      const response = await axios.post("/api/stripe/create-checkout-session", {
        tier: tierName,
        interval: isYearly ? "year" : "month",
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else if (response.data.updated) {
        import("react-hot-toast").then(({ toast }) => {
          if (response.data.reactivated) {
            toast.success("Welcome back! Subscription reactivated successfully.");
          } else {
            toast.success("Subscription updated successfully!");
          }
          setTimeout(() => {
            window.location.href = "/user/dashboard";
          }, 2000);
        });
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      const errorMessage = error.response?.data?.error || "Failed to start checkout. Please try again.";
      import("react-hot-toast").then(({ toast }) => {
        toast.error(errorMessage);
      });
      setSubscribingTier(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black">
      <TopNavComp />

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Financial Journey
            </span>
          </h1>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
            Unlock powerful features designed to transform how you manage your money.
            Start free, upgrade anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-lg font-medium transition-colors ${!isYearly ? "text-white" : "text-neutral-500"
                }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 bg-neutral-800 rounded-full p-1 transition-colors hover:bg-neutral-700"
              aria-label="Toggle billing period"
            >
              <motion.div
                className="w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-lg"
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`text-lg font-medium transition-colors ${isYearly ? "text-white" : "text-neutral-500"
                }`}
            >
              Yearly
            </span>
            {isYearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full"
              >
                2 Months Free
              </motion.span>
            )}
          </div>

          {/* Free Trial Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full inline-block"
          >
            <span className="text-green-400 font-semibold">🎉 Start with 2 months FREE on all paid plans!</span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {tiers.map((tier, index) => {
            const tierName = tier.name as TierName;
            const colors = TIER_COLORS[tierName];
            const features = TIER_FEATURES[tierName];
            const icon = TIER_ICONS[tierName];
            const isCurrentPlan = currentPlan === tierName;
            const isHighlighted = tierName === "White";

            if (!colors || !features) return null;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group ${isHighlighted ? "lg:-mt-4 lg:mb-4" : ""}`}
              >
                {/* Popular Badge */}
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="px-4 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-sm rounded-full shadow-lg shadow-amber-500/30"
                    >
                      MOST POPULAR
                    </motion.div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`relative h-full rounded-2xl overflow-hidden transition-all duration-300 ${isHighlighted
                    ? "ring-2 ring-amber-500/50 shadow-2xl shadow-amber-500/20"
                    : "hover:ring-1 hover:ring-neutral-700"
                    }`}
                  style={{
                    background:
                      tierName === "Black"
                        ? `linear-gradient(135deg, ${colors.gradient.from}, ${colors.gradient.via}, ${colors.gradient.to})`
                        : `linear-gradient(135deg, ${colors.gradient.from}15, ${colors.gradient.to}10)`,
                  }}
                >
                  {/* Animated gradient border for Black tier */}
                  {tierName === "Black" && (
                    <div className="absolute inset-0 rounded-2xl opacity-50">
                      <div
                        className="absolute inset-[1px] rounded-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${colors.gradient.from}, ${colors.gradient.to})`,
                        }}
                      />
                    </div>
                  )}

                  {/* Glass overlay */}
                  <div
                    className={`relative h-full p-6 backdrop-blur-sm ${tierName === "Black" ? "bg-black/60" : "bg-neutral-900/80"
                      }`}
                  >
                    {/* Current Plan Badge */}
                    {isCurrentPlan && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                          Current Plan
                        </span>
                      </div>
                    )}

                    {/* Tier Icon & Name */}
                    <div className="mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          background: `linear-gradient(135deg, ${colors.button.from}, ${colors.button.to})`,
                          color: tierName === "Black" ? "#000" : colors.text.primary,
                        }}
                      >
                        {icon}
                      </div>
                      <h3
                        className="text-2xl font-bold mb-1"
                        style={{
                          color: tierName === "Black" ? colors.text.primary : "#fff",
                        }}
                      >
                        {tier.name}
                      </h3>
                      <p
                        className="text-sm"
                        style={{
                          color: tierName === "Black" ? colors.text.secondary : "#9ca3af",
                        }}
                      >
                        {features.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-4xl font-bold"
                          style={{
                            color: tierName === "Black" ? colors.text.primary : "#fff",
                          }}
                        >
                          {tierName === "White" ? "Free" : `$${getPrice(tier)}`}
                        </span>
                        {tierName !== "White" && (
                          <span
                            className="text-sm"
                            style={{
                              color: tierName === "Black" ? colors.text.secondary : "#9ca3af",
                            }}
                          >
                            /{isYearly ? "year" : "month"}
                          </span>
                        )}
                      </div>
                      {isYearly && tier.monthlyPrice && tierName !== "White" && (
                        <p className="text-sm text-neutral-500 mt-1">
                          <span className="line-through">
                            ${tier.monthlyPrice * 12}
                          </span>{" "}
                          <span className="text-green-400">Save ${getSavings(tier)}</span>
                        </p>
                      )}
                    </div>

                    {/* Subscribe Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSubscribe(tierName)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 mb-6 ${isCurrentPlan || tierName !== "White"
                        ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                        : "shadow-lg hover:shadow-xl cursor-pointer"
                        } ${subscribingTier !== null && subscribingTier !== tierName ? "opacity-50 cursor-not-allowed" : ""}`}
                      style={
                        !isCurrentPlan && tierName === "White"
                          ? {
                            background: `linear-gradient(135deg, ${colors.button.from}, ${colors.button.to})`,
                            color: "#333",
                            boxShadow: `0 8px 24px -8px ${colors.button.from}60`,
                          }
                          : undefined
                      }
                      disabled={isCurrentPlan || tierName !== "White" || subscribingTier !== null}
                    >
                      {isCurrentPlan ? (
                        "Current Plan"
                      ) : subscribingTier === tierName ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Subscribing...</span>
                        </div>
                      ) : tierName === "White" ? (
                        "Get Started Free"
                      ) : (
                        "Coming Soon"
                      )}
                    </motion.button>

                    {/* Features */}
                    <ul className="space-y-3">
                      {features.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + featureIndex * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          {feature.available ? <Check
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            style={{ color: colors.icon }}
                          /> : <Clock
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            style={{ color: colors.icon }}
                          />}
                          <span
                            className="text-sm"
                            style={{
                              color: tierName === "Black" ? colors.text.secondary : "#d1d5db",
                            }}
                          >
                            {feature.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400">
            Everything you need to know about our plans
          </p>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              q: "Can I switch plans anytime?",
              a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, debit cards, and PayPal through our secure Stripe payment system.",
            },
            {
              q: "Can I cancel my subscription?",
              a: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.",
            },
            {
              q: "What happens to my data if I downgrade?",
              a: "Your data is always safe. If you downgrade, you'll retain access to your data but some features may become read-only.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors"
            >
              <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
              <p className="text-neutral-400 text-sm">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center"
          style={{
            background: `linear-gradient(135deg, ${TIER_COLORS.Gold.gradient.from}, ${TIER_COLORS.Gold.gradient.via}, ${TIER_COLORS.Gold.gradient.to})`,
          }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Ready to Take Control?
            </h2>
            <p className="text-neutral-700 mb-8 max-w-xl mx-auto">
              Join thousands of users who have transformed their financial lives with PayLinq.
              Start your journey today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSubscribe("White")}
              className="px-8 py-4 bg-neutral-900 text-white font-semibold rounded-xl shadow-xl hover:bg-neutral-800 transition-colors"
            >
              Get Started
            </motion.button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-300/30 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
}
