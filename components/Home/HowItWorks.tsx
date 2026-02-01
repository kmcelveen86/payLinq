"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CreditCard, ShoppingBag, Award, ArrowRight, UserPlus, Gift } from "lucide-react";
import {
  PaylinqDebit,
  PaylinqShopping,
  PaylinqRewardsAndBenefits,
} from "../SVGImage";

const featureItems = [
  {
    step: 1,
    title: "Become a Member",
    description:
      "Sign up for a PayLinq membership to unlock exclusive rewards and benefits.",
    icon: <UserPlus size={28} className="text-[#2D9642]" />,
    image: <PaylinqDebit />,
    alt: "PayLinq Membership",
    color: "#2D9642",
  },
  {
    step: 2,
    title: "Shop & Earn UPP",
    description:
      "Shop at our partner merchants and earn Universal PayLinq Points (UPP) on every purchase.",
    icon: <ShoppingBag size={28} className="text-[#2D9642]" />,
    image: <PaylinqShopping />,
    alt: "Shop and Earn",
    color: "#2D9642",
  },
  {
    step: 3,
    title: "Redeem Rewards",
    description:
      "Use your UPP to redeem cash back, gift cards, and exclusive experiences.",
    icon: <Gift size={28} className="text-[#C28F49]" />,
    image: <PaylinqRewardsAndBenefits />,
    alt: "Redeem Rewards",
    color: "#C28F49",
  },
];

export default function HowItWorks() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 'some', margin: "0px 0px -100px 0px" });

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
    <div
      className="relative overflow-hidden py-20"
      style={{
        background:
          "linear-gradient(135deg, #090909 0%, #111111 50%, #0A0A0A 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: "#2D9642" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: "#C28F49" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full blur-3xl opacity-10"
          style={{ background: "#2D9642" }}
        ></div>

        {/* Animated subtle particles */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full"
          style={{ background: "#2D9642" }}
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/3 w-3 h-3 rounded-full"
          style={{ background: "#C28F49" }}
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full"
          style={{ background: "#2D9642" }}
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Typography
                variant="h1"
                component="h2"
                sx={{
                  fontSize: { xs: '1.875rem', md: '2.25rem', lg: '3rem' },
                  fontWeight: 'bold',
                  marginBottom: '3.5rem',
                  fontFamily: 'sans-serif',
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(90deg, #2D9642, #C28F49)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                }}
              >
                How PayLinq Works
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-gray-300 text-lg md:text-xl">
                Elevate your everyday spending with rewards that match your
                lifestyle. Follow these simple steps to begin your PayLinq
                journey.
              </p>
            </motion.div>
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
                className="relative bg-gray-900 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-800"
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
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mb-6 shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}, ${item.color === "#2D9642" ? "#38B053" : "#D9A55C"
                        })`,
                    }}
                  >
                    {item.step}
                  </div>

                  <h3 className="text-xl font-bold mb-3 flex items-center text-white">
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mb-6 min-h-[60px]">
                    {item.description}
                  </p>

                  {/* Image with hover animation */}
                  <div className="rounded-lg overflow-hidden flex justify-center bg-gray-800 p-4 border border-gray-700">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
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
                    background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)`,
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
            <div className="rounded-2xl p-8 md:p-12 shadow-lg mx-auto max-w-4xl border border-gray-700 bg-linear-to-r from-gray-900 to-gray-800">
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
                className="px-8 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center mx-auto space-x-2"
                style={{
                  background:
                    "linear-gradient(90deg, #2D9642 0%, #C28F49 100%)",
                }}
              >
                <span>Start Earning Rewards</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
