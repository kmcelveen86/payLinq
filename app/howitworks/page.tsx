"use client";
import React, { useEffect, useState } from "react";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Gift,
  Zap,
  Award,
  Shield,
  TrendingUp,
  Coffee,
  CheckCircle,
} from "lucide-react";
import {
  PaylinqSignUpGetCard,
  PaylinqShopEarnPoints,
  PaylinqRedeemEnjoy,
  PaylinqLevelUpGetMore,
} from "@/components/SVGImage";

export default function HowItWorksContent() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    users: 0,
    merchants: 0,
    savings: 0,
    rewards: 0,
  });

  const finalValues = {
    users: 25000,
    merchants: 1500,
    savings: 15,
    rewards: 5,
  };

  // Animation triggers
  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 5000);

    // Animate counters
    const counterInterval = setInterval(() => {
      setCounters((prev) => ({
        users:
          prev.users < finalValues.users
            ? prev.users + Math.ceil(finalValues.users / 30)
            : finalValues.users,
        merchants:
          prev.merchants < finalValues.merchants
            ? prev.merchants + Math.ceil(finalValues.merchants / 30)
            : finalValues.merchants,
        savings:
          prev.savings < finalValues.savings
            ? prev.savings + 0.5
            : finalValues.savings,
        rewards:
          prev.rewards < finalValues.rewards
            ? prev.rewards + 0.2
            : finalValues.rewards,
      }));
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(counterInterval);
    };
  }, []);

  // Steps data
  const steps = [
    {
      title: "Sign Up & Get Your Card",
      icon: <CreditCard className="w-8 h-8" />,
      description:
        "Create your account, verify your identity, and receive your personalized PayLinq rewards card within days.",
      color: "from-[#2D9642] to-[#38b053]",
      image: <PaylinqSignUpGetCard />,
    },
    {
      title: "Shop & Earn Points",
      icon: <Gift className="w-8 h-8" />,
      description:
        "Use your card for everyday purchases and watch as points roll in. Earn extra points on dining, travel, and special promotions.",
      color: "from-[#2D9642] to-[#38b053]",
      image: <PaylinqShopEarnPoints />,
    },
    {
      title: "Redeem & Enjoy",
      icon: <Award className="w-8 h-8" />,
      description:
        "Convert your points to cash rewards, gift cards, travel benefits, or exclusive experiences through our rewards marketplace.",
      color: "from-[#C28F49] to-[#d9a55c]",
      image: <PaylinqRedeemEnjoy />,
    },
    {
      title: "Level Up & Get More",
      icon: <TrendingUp className="w-8 h-8" />,
      description:
        "Upgrade your membership tier to unlock higher earning rates, exclusive perks, and VIP treatment with our partners.",
      color: "from-[#C28F49] to-[#d9a55c]",
      image: <PaylinqLevelUpGetMore />,
    },
  ];

  // Features data
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-[#2D9642]" />,
      title: "Bank-Level Security",
      description:
        "Your money and data are protected with the latest security technology and fraud protection.",
    },
    {
      icon: <Zap className="w-6 h-6 text-[#2D9642]" />,
      title: "Instant Notifications",
      description:
        "Get real-time alerts for transactions, point earnings, and special deals.",
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#C28F49]" />,
      title: "Exclusive Partnerships",
      description:
        "Enjoy special rates and offers with our growing network of premium merchants and brands.",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-[#C28F49]" />,
      title: "No Hidden Fees",
      description:
        "Transparent pricing with no surprise charges. What you see is what you get.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full pb-20 pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #2D9642 0%, rgba(45, 150, 66, 0) 70%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #C28F49 0%, rgba(194, 143, 73, 0) 70%)",
              filter: "blur(50px)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#2D9642] to-[#C28F49]">
              How PayLinq Works
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Earn rewards on every purchase, enjoy exclusive perks, and take
              control of your finances with our innovative rewards program.
            </p>
          </motion.div>

          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center mb-12"
          >
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStep === index
                      ? "bg-gradient-to-r from-[#2D9642] to-[#C28F49] w-12"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Steps Carousel */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <div className="p-8 bg-gray-800 rounded-2xl border border-gray-700 shadow-xl">
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br mb-6 text-white shadow-lg"
                      style={{
                        background: `linear-gradient(to right, ${
                          steps[activeStep].color.split(" ")[1]
                        }, ${steps[activeStep].color.split(" ")[2]})`,
                      }}
                    >
                      {steps[activeStep].icon}
                    </div>
                    <h2 className="text-2xl font-bold mb-4">
                      {steps[activeStep].title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {steps[activeStep].description}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-800 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    {steps[activeStep].image}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">By The Numbers</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#2D9642] to-[#C28F49] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Happy Users",
                value: counters.users.toLocaleString(),
                plus: true,
              },
              {
                label: "Partner Merchants",
                value: counters.merchants.toLocaleString(),
                plus: true,
              },
              {
                label: "Avg. Monthly Savings",
                value: counters.savings.toFixed(1),
                percent: true,
              },
              {
                label: "Points Per Dollar",
                value: counters.rewards.toFixed(1),
                up_to: true,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2D9642]/5 to-[#C28F49]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#2D9642] to-[#C28F49]">
                  {stat.value}
                  {stat.plus && "+"}
                  {stat.percent && "%"}
                  {stat.up_to && <span className="text-xl">up to</span>}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Why Choose PayLinq</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#2D9642] to-[#C28F49] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#2D9642] to-[#C28F49] mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get answers to the most common questions about PayLinq rewards and
              membership
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How soon can I start using my rewards?",
                answer:
                  "Points are added to your account immediately after transactions settle, typically within 1-2 business days. You can redeem rewards as soon as you have enough points for your chosen reward option.",
              },
              {
                question: "Can I upgrade my membership tier later?",
                answer:
                  "Absolutely! You can upgrade your membership tier at any time through your account dashboard. Your new benefits will take effect immediately, and you'll start earning at the higher rate with your very next purchase.",
              },
              {
                question: "What happens to my points if I don't use them?",
                answer:
                  "Your points never expire! They remain in your account and you can accumulate and use them whenever you're ready.",
              },
              {
                question: "How do I track my rewards and spending?",
                answer:
                  "The PayLinq dashboard and mobile app provide real-time tracking for all your transactions, point earnings, and available rewards. You can also set up custom spending categories and alerts to help manage your finances.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-gray-700 rounded-xl overflow-hidden shadow-md"
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6 text-white">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-300">{faq.answer}</div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-900 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #2D9642 0%, rgba(45, 150, 66, 0) 70%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #C28F49 0%, rgba(194, 143, 73, 0) 70%)",
              filter: "blur(50px)",
            }}
          />
        </div>
        <SignedOut>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">
                Ready to Start Earning Rewards?
              </h2>
              <p className="text-gray-300 mb-8">
                Join thousands of satisfied members who are maximizing their
                rewards with every purchase.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#2D9642] to-[#C28F49] rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <SignInButton>Join Waitlist</SignInButton>
              </motion.div>
              <p className="text-gray-500 mt-4">
                No credit check required. Get started in minutes.
              </p>
            </motion.div>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
