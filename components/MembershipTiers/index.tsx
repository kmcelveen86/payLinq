"use client";
import React, { useState } from "react";
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
} from "lucide-react";

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
  icon: React.ReactNode;
  features: FeatureType[];
  rewards: RewardType[];
  redemptionRate: number;
  pointsFor100: number;
  maxMonthlyPoints: number;
  maxAnnualPoints: number;
  expiration: string;
  recommended?: boolean;
  selected?: boolean;
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

const MembershipTiers: React.FC = () => {
  const [annualBilling, setAnnualBilling] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  // Handle tier selection
  const handleSelectTier = (tierName: string): void => {
    if (tierName !== "Freemium") return; // Only allow Freemium to be selected
    setSelectedTier(tierName);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 pt-24 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choose Your Paylinq Membership
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the plan that best fits your lifestyle and financial goals
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <span
              className={`mr-3 text-sm font-medium ${
                !annualBilling ? "text-indigo-700" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200"
              onClick={() => setAnnualBilling(!annualBilling)}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-indigo-600 transition ${
                  annualBilling ? "translate-x-9" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`ml-3 text-sm font-medium ${
                annualBilling ? "text-indigo-700" : "text-gray-500"
              }`}
            >
              Annually{" "}
              <span className="text-emerald-500 font-bold">(Save 15%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Freemium Tier */}
          <PricingCard
            tierName="Freemium"
            tagline="Start your journey"
            price={0}
            color="bg-gray-100"
            accentColor="border-gray-400"
            buttonColor="bg-gray-600 hover:bg-gray-700"
            icon={<CreditCard className="h-8 w-8 text-gray-500" />}
            features={[
              { icon: <CreditCard />, text: "Paylinq Reward Debit Card" },
              {
                icon: <Shield />,
                text: "Credit Reporting",
                comingSoon: true,
              },
              {
                icon: <Award />,
                text: "Loyalty Rewards Program",
                comingSoon: true,
              },
              {
                icon: <Plane />,
                text: "Travel Benefits",
                comingSoon: true,
              },
              {
                icon: <Briefcase />,
                text: "Hotel Partner Benefits",
                comingSoon: true,
              },
            ]}
            rewards={[
              { category: "Everyday Purchases", points: 1 },
              { category: "Dining", points: 2 },
              { category: "Travel", points: 2 },
            ]}
            redemptionRate={0.005}
            pointsFor100={20000}
            maxMonthlyPoints={10000}
            maxAnnualPoints={120000}
            expiration="18 months"
            recommended={true}
            selected={selectedTier === "Freemium"}
            onSelect={() => handleSelectTier("Freemium")}
            annualBilling={annualBilling}
          />

          {/* Lifestyle Tier */}
          <PricingCard
            tierName="Lifestyle"
            tagline="Enhance your rewards"
            price={20}
            color="bg-blue-50"
            accentColor="border-blue-400"
            buttonColor="bg-blue-600 hover:bg-blue-700"
            icon={<Coffee className="h-8 w-8 text-blue-500" />}
            features={[
              { icon: <CreditCard />, text: "All Freemium Features" },
              { icon: <Shield />, text: "Enhanced Credit Reporting" },
              { icon: <Zap />, text: "Exclusive Deals & Insights" },
              { icon: <Award />, text: "Full Loyalty Program Access" },
              { icon: <Plane />, text: "Premium Travel Benefits" },
            ]}
            rewards={[
              { category: "Everyday Purchases", points: 2 },
              { category: "Dining", points: 3 },
              { category: "Travel", points: 3 },
            ]}
            redemptionRate={0.01}
            pointsFor100={10000}
            maxMonthlyPoints={20000}
            maxAnnualPoints={240000}
            expiration="24 months"
            selected={selectedTier === "Lifestyle"}
            onSelect={() => handleSelectTier("Lifestyle")}
            annualBilling={annualBilling}
            disabled={true}
          />

          {/* VIP Lifestyle Tier */}
          <PricingCard
            tierName="VIP Lifestyle"
            tagline="Premium experience"
            price={50}
            color="bg-purple-50"
            accentColor="border-purple-400"
            buttonColor="bg-purple-600 hover:bg-purple-700"
            icon={<Gift className="h-8 w-8 text-purple-500" />}
            features={[
              { icon: <CreditCard />, text: "All Lifestyle Features" },
              { icon: <Zap />, text: "Priority Customer Support" },
              { icon: <Award />, text: "VIP Events & Birthday Gift" },
              { icon: <Briefcase />, text: "Financial Advice Sessions" },
              { icon: <Plane />, text: "Premium Lounge Access" },
            ]}
            rewards={[
              { category: "Everyday Purchases", points: 3 },
              { category: "Dining", points: 4 },
              { category: "Travel", points: 4 },
            ]}
            redemptionRate={0.015}
            pointsFor100={6667}
            maxMonthlyPoints={30000}
            maxAnnualPoints={360000}
            expiration="36 months"
            selected={selectedTier === "VIP Lifestyle"}
            onSelect={() => handleSelectTier("VIP Lifestyle")}
            annualBilling={annualBilling}
            disabled={true}
          />

          {/* Elite Lifestyle Tier */}
          <PricingCard
            tierName="Elite Lifestyle"
            tagline="Luxury redefined"
            price={75}
            color="bg-indigo-50"
            accentColor="border-indigo-400"
            buttonColor="bg-indigo-600 hover:bg-indigo-700"
            icon={<Sparkle className="h-8 w-8 text-indigo-500" />}
            features={[
              { icon: <CreditCard />, text: "All VIP Lifestyle Features" },
              { icon: <Plane />, text: "Luxury Travel Experiences" },
              { icon: <Star />, text: "Dedicated Account Manager" },
              { icon: <Zap />, text: "24/7 Concierge Services" },
              { icon: <Award />, text: "Exclusive VIP Events" },
            ]}
            rewards={[
              { category: "Everyday Purchases", points: 5 },
              { category: "Dining", points: 5 },
              { category: "Travel", points: 5 },
            ]}
            redemptionRate={0.02}
            pointsFor100={5000}
            maxMonthlyPoints={50000}
            maxAnnualPoints={600000}
            expiration="Never expires"
            selected={selectedTier === "Elite Lifestyle"}
            onSelect={() => handleSelectTier("Elite Lifestyle")}
            annualBilling={annualBilling}
            disabled={true}
          />
        </div>

        {/* Feature Comparison Table */}
        <FeatureComparisonTable annualBilling={annualBilling} />

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
};

// PricingCard Component
const PricingCard: React.FC<PricingCardProps> = ({
  tierName,
  tagline,
  price,
  color,
  accentColor,
  buttonColor,
  icon,
  features,
  rewards,
  redemptionRate,
  pointsFor100,
  maxMonthlyPoints,
  maxAnnualPoints,
  expiration,
  recommended = false,
  selected = false,
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
    <div
      className={`rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 ${
        selected ? "scale-105 ring-2 ring-indigo-500" : "hover:scale-105"
      } ${color} ${disabled ? "opacity-80" : ""}`}
    >
      {recommended && (
        <div className="bg-emerald-500 text-white text-center py-1 font-semibold text-sm">
          MOST POPULAR
        </div>
      )}

      <div className="p-6">
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{tierName}</h3>
            <p className="text-sm text-gray-500 mt-1">{tagline}</p>
          </div>
          {icon}
        </div>

        {/* Price */}
        <div className="mt-6 mb-6">
          <span className="text-4xl font-bold text-gray-900">
            {priceDisplay}
          </span>
        </div>

        {/* Rewards Section */}
        <div className={`border-t ${accentColor} pt-4 mb-6`}>
          <h4 className="font-semibold text-gray-800 mb-2">Rewards</h4>
          <ul className="space-y-2">
            {rewards.map((reward, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{reward.category}</span>
                <span className="font-semibold">
                  {reward.points} pts per $1
                </span>
              </li>
            ))}
            <li className="flex justify-between text-sm pt-2">
              <span className="text-gray-600">Redemption Rate</span>
              <span className="font-semibold">
                ${redemptionRate.toFixed(3)} per point
              </span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-600">For $100 Redemption</span>
              <span className="font-semibold">
                {pointsFor100.toLocaleString()} points
              </span>
            </li>
          </ul>
        </div>

        {/* Features List */}
        <div className={`border-t ${accentColor} pt-4 mb-6`}>
          <h4 className="font-semibold text-gray-800 mb-2">Key Features</h4>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-emerald-500 mr-2">
                  {feature.comingSoon ? (
                    <Clock size={18} className="text-amber-500" />
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
              </li>
            ))}
          </ul>
        </div>

        {/* Point Limits */}
        <div className={`border-t ${accentColor} pt-4 mb-6`}>
          <h4 className="font-semibold text-gray-800 mb-2">Point Limits</h4>
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
        <button
          onClick={onSelect}
          disabled={disabled}
          className={`w-full ${buttonColor} text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-2 ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {selected
            ? "Selected"
            : disabled
            ? "Coming Soon"
            : tierName === "Freemium"
            ? "Get Started"
            : "Select Plan"}
        </button>
      </div>
    </div>
  );
};

// Feature Comparison Table Component
const FeatureComparisonTable: React.FC<{ annualBilling: boolean }> = ({
  annualBilling,
}) => {
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
        {
          name: "Credit Reporting",
          tiers: [
            { value: "2 Accounts", comingSoon: true },
            "Multiple Accounts",
            "Multiple Accounts",
            "Multiple Accounts",
          ],
        },
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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
      <div className="p-6 bg-gray-50 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Feature Comparison</h2>
        <p className="text-gray-600 mt-1">
          Compare all features across our membership tiers
        </p>
        <div className="mt-3 text-sm flex items-center text-amber-600">
          <span className="inline-block w-3 h-3 bg-amber-100 border border-amber-300 rounded-full mr-2"></span>
          Features with a dot indicator are coming soon
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 w-1/5">
                Feature
              </th>
              {tiers.map((tier, index) => {
                const annualPrice = Math.ceil(tier.price * 12 * 0.85);
                const priceDisplay =
                  tier.price === 0
                    ? "Free"
                    : `$${annualBilling ? annualPrice : tier.price}${
                        annualBilling ? "/year" : "/month"
                      }`;
                const isAvailable = index === 0;

                return (
                  <th
                    key={index}
                    className="py-4 px-6 text-center text-sm font-semibold text-gray-600 w-1/5"
                  >
                    <span className="block text-lg font-bold text-gray-900">
                      {tier.name}
                    </span>
                    <span className="text-base">{priceDisplay}</span>
                    {!isAvailable && (
                      <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {featureCategories.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr className="bg-gray-100">
                  <td colSpan={5} className="py-3 px-6 font-bold text-gray-800">
                    {category.name}
                  </td>
                </tr>
                {category.features.map((feature, featureIndex) => (
                  <tr key={featureIndex} className="border-t">
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {feature.name}
                    </td>
                    {feature.tiers.map((value, tierIndex) => (
                      <td
                        key={tierIndex}
                        className="py-4 px-6 text-center text-sm"
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <Check className="mx-auto h-5 w-5 text-emerald-500" />
                          ) : (
                            <span className="block mx-auto h-5 w-5 text-gray-300">
                              —
                            </span>
                          )
                        ) : typeof value === "object" ? (
                          <div className="relative inline-flex items-center justify-center">
                            <span className="text-gray-700 font-medium">
                              {value.value}
                            </span>
                            <span className="absolute -top-1 right-[-10px] w-2 h-2 bg-amber-400 rounded-full"></span>
                          </div>
                        ) : (
                          <span className="text-gray-700 font-medium">
                            {value}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
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
        "You can redeem your Paylinq Reward points through our mobile app or web portal. Simply navigate to the Rewards section, select 'Redeem Points', and choose from options including statement credits, gift cards, travel bookings, or merchandise.",
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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
      <div className="p-6 bg-gray-50 border-b">
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
            <div
              key={index}
              className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
            >
              <button
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                <span className="ml-6 flex-shrink-0">
                  {openItem === index ? (
                    <svg
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </button>
              {openItem === index && (
                <div className="mt-3 text-base text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipTiers;
