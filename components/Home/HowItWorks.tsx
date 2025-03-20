/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CreditCard, ShoppingBag, Award } from "lucide-react";
import {
  PaylinqDebit,
  PaylinqShopping,
  PaylinqRewardsAndBenefits,
} from "../SVGImage";

const featureItems = [
  {
    step: 1,
    title: "Get Your Paylinq Debit Card",
    description:
      "Receive your premium Paylinq Debit Card delivered right to your doorstep.",
    icon: <CreditCard size={28} className="text-emerald-400" />,
    image: <PaylinqDebit />,
    alt: "Paylinq Debit Card",
    color: "#10B981",
  },
  {
    step: 2,
    title: "Make Everyday Purchases",
    description:
      "Use your Paylinq Debit Card for all your transactions and start earning rewards immediately.",
    icon: <ShoppingBag size={28} className="text-blue-400" />,
    image: <PaylinqShopping />,
    alt: "Person shopping with Paylinq card",
    color: "#6366F1",
  },
  {
    step: 3,
    title: "Enjoy Exclusive Benefits",
    description:
      "Be among the first to experience Paylinq and access premium rewards that will enhance your lifestyle.",
    icon: <Award size={28} className="text-pink-400" />,
    image: <PaylinqRewardsAndBenefits />,
    alt: "Rewards and benefits",
    color: "#EC4899",
  },
];

export default function HowItWorks() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative overflow-hidden bg-black py-20">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-900 blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-900 blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-pink-900 blur-3xl opacity-15"></div>

        {/* Animated subtle particles */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-emerald-500"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/3 w-3 h-3 rounded-full bg-blue-500"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full bg-pink-500"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="py-12 lg:py-20"
        >
          {/* Header */}
          <motion.div variants={fadeInUpVariants} className="text-center mb-16">
            <Typography
              variant="h1"
              component="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 text-transparent bg-clip-text font-sans"
            >
              How Paylinq Works
            </Typography>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-400 text-lg md:text-xl">
                Elevate your everyday spending with rewards that match your
                lifestyle. Follow these simple steps to begin your Paylinq
                journey.
              </p>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {featureItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-gray-900 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-800"
              >
                {/* Top color band */}
                <div
                  className="h-2"
                  style={{ backgroundColor: item.color }}
                ></div>

                {/* Content */}
                <div className="p-8">
                  {/* Step number with gradient background */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
                    }}
                  >
                    {item.step}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mb-6 min-h-[60px]">
                    {item.description}
                  </p>

                  {/* Image with hover animation */}
                  <div className="rounded-lg overflow-hidden flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.image}
                    </motion.div>
                  </div>
                </div>

                {/* Animated glow on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${item.color}66 0%, transparent 70%)`,
                  }}
                />

                {/* Decorative corner accent */}
                <div
                  className="absolute top-2 right-2 w-12 h-12 opacity-20"
                  style={{
                    backgroundColor: item.color,
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                ></div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={fadeInUpVariants} className="mt-20 text-center">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 shadow-lg mx-auto max-w-4xl border border-gray-700">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to elevate your finances?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of members who are already transforming their
                everyday purchases into exceptional rewards.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Your Paylinq Card
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
