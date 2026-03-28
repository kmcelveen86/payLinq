"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Hotel,
  Car,
  Map,
  ArrowRight,
  Shield,
  Globe,
  Coins,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import PaylinqFooter from "@/components/PaylinqFooter";

export default function TravelRewardsPage() {
  const howItWorks = [
    {
      step: "1",
      title: "Book Travel",
      description: "Book travel through Paylinq's travel portal.",
    },
    {
      step: "2",
      title: "Complete Trip",
      description: "Complete your trip as planned.",
    },
    {
      step: "3",
      title: "Earn Points",
      description: "Earn Paylinq Cash automatically.",
    },
    {
      step: "4",
      title: "Convert to Paylinq Cash",
      description: "Convert points into Paylinq Cash.",
    },
  ];

  const categories = [
    {
      icon: Plane,
      name: "Flights",
      points: "200 Paylinq Cash",
      description: "Domestic & international",
    },
    {
      icon: Hotel,
      name: "Hotels",
      points: "400 Paylinq Cash",
      description: "All accommodations",
    },
    {
      icon: Car,
      name: "Car Rentals",
      points: "300 Paylinq Cash",
      description: "Rental vehicles",
    },
    {
      icon: Map,
      name: "Vacation Packages",
      points: "600 Paylinq Cash",
      description: "Bundle deals",
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Universal Rewards",
      description: "Earn rewards across all travel categories",
    },
    {
      icon: Shield,
      title: "No Disruption",
      description:
        "Doesn't interfere with existing airline or hotel loyalty programs",
    },
    {
      icon: Coins,
      title: "Real Value",
      description: "Convert to real-world value with Paylinq Cash",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Partner-backed secure travel booking",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #2D9642 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] mb-6">
              <Plane size={32} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel Rewards
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Travel the World. Earn Real Rewards.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-[#2D9642]/10 to-[#C28F49]/10 rounded-xl p-8 border border-[#2D9642]/30 mb-12"
        >
          <p className="text-lg text-gray-300 leading-relaxed">
            With Paylinq, members earn Paylinq Cash when booking travel
            through our integrated travel marketplace. Flights, hotels, car
            rentals, activities, and travel insurance all earn rewards —
            automatically.
          </p>
          <div className="mt-6 p-4 bg-[#2D9642]/10 rounded-lg border border-[#2D9642]/30">
            <p className="text-[#C28F49] font-medium text-center">
              1,000 Paylinq Cash = $10 value (White Tier)
            </p>
            <p className="text-gray-400 text-sm text-center mt-2">
              Rewards are funded through partner marketing agreements
            </p>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howItWorks.map((step, idx) => (
              <div
                key={idx}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D9642] to-[#C28F49] flex items-center justify-center text-white font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What You Can Book */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            What You Can Book
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#2D9642]/50 transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center"
                >
                  <cat.icon size={28} className="text-[#C28F49]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{cat.name}</h3>
                  <p className="text-gray-400 text-sm">{cat.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#C28F49] font-bold">{cat.points}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-[#C28F49]/10 rounded-lg border border-[#C28F49]/30">
            <p className="text-gray-300 text-center text-sm">
              <strong className="text-white">Monthly travel earning cap:</strong>{" "}
              4,000 Paylinq Cash
            </p>
            <p className="text-gray-400 text-center text-xs mt-1">
              Paylinq Cash is credited after booking confirmation
            </p>
          </div>
        </motion.div>

        {/* Why Different */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Why Paylinq Travel Is Different
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-800"
              >
                <div className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2D9642]/20 to-[#C28F49]/20 flex items-center justify-center"
                  >
                    <benefit.icon size={20} className="text-[#C28F49]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disclosures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-[#C28F49]/10 rounded-xl p-6 border border-[#C28F49]/30"
        >
          <div className="flex items-start gap-4"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#C28F49]/20 flex items-center justify-center"
            >
              <AlertCircle size={20} className="text-[#C28F49]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Important Disclosures
              </h2>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <ArrowRight
                    size={16}
                    className="text-[#C28F49] mt-1 flex-shrink-0"
                  />
                  Paylinq partners with licensed travel providers for booking
                  fulfillment.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight
                    size={16}
                    className="text-[#C28F49] mt-1 flex-shrink-0"
                  />
                  Travel services are provided by third-party suppliers.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight
                    size={16}
                    className="text-[#C28F49] mt-1 flex-shrink-0"
                  />
                  Reward issuance is subject to booking confirmation and partner
                  validation.
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight
                    size={16}
                    className="text-[#C28F49] mt-1 flex-shrink-0"
                  />
                  Paylinq does not operate as a travel agency.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <span>← Back to Home</span>
          </Link>
        </motion.div>
      </div>
      </div>
      <PaylinqFooter />
    </>
  );
}
