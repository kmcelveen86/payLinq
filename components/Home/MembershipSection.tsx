"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Milestone } from "lucide-react";

export default function RoadmapSection() {
  const [hoveredCard, setHoveredCard] = useState(0); // 0 is default (first card)

  const getCardStyle = (cardIndex: number) => {
    if (cardIndex === hoveredCard) {
      return "bg-gradient-to-br from-orange-400 to-orange-500";
    }
    return "bg-gray-100";
  };

  const getBadgeStyle = (cardIndex: number) => {
    if (cardIndex === hoveredCard) {
      return "bg-orange-600";
    }
    return cardIndex === 0 ? "bg-yellow-600" : "bg-gray-600";
  };

  return (
    <div className="bg-white py-16 px-4 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl lg:text-4xl font-bold mb-4">
          Our Roadmap
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-stretch justify-center space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Phase 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`${getCardStyle(0)} p-8 rounded-lg shadow-lg w-full lg:w-1/3 transition-all duration-300 hover:scale-105 cursor-pointer`}
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(0)} // Reset to default state (Phase 1)
        >
          <div className="flex items-center mb-4">
            <Milestone className="w-6 h-6 mr-2" />
            <h3 className="text-xl font-bold">Phase 1 (MVP)</h3>
          </div>
          <h4 className="text-lg font-semibold mb-2">Track Bills, Earn Points</h4>
          <p className="text-sm">
            Start earning 500 points/month just by paying your bills on time. Link your debit card, and we&#39;ll take care of the rest.
          </p>
          <div className={`mt-4 inline-block ${getBadgeStyle(0)} text-white px-3 py-1 rounded-full text-sm transition-colors duration-300`}>
            Current Phase
          </div>
        </motion.div>

        {/* Phase 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${getCardStyle(1)} p-8 rounded-lg shadow-lg w-full lg:w-1/3 transition-all duration-300 hover:scale-105 cursor-pointer`}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(0)}
        >
          <div className="flex items-center mb-4">
            <Milestone className="w-6 h-6 mr-2" />
            <h3 className="text-xl font-bold">Phase 2</h3>
          </div>
          <h4 className="text-lg font-semibold mb-2">Redeem Points, Build Credit</h4>
          <p className="text-sm">
            Soon, you&#39;ll be able to redeem your points for flights, hotels, and exclusive perks at our partner merchants. Plus, you&#39;ll build credit simply by paying bills.
          </p>
          <div className={`mt-4 inline-block ${getBadgeStyle(1)} text-white px-3 py-1 rounded-full text-sm transition-colors duration-300`}>
            Coming Soon
          </div>
        </motion.div>

        {/* Phase 3 */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`${getCardStyle(2)} p-8 rounded-lg shadow-lg w-full lg:w-1/3 transition-all duration-300 hover:scale-105 cursor-pointer`}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(0)}
        >
          <div className="flex items-center mb-4">
            <Milestone className="w-6 h-6 mr-2" />
            <h3 className="text-xl font-bold">Phase 3</h3>
          </div>
          <h4 className="text-lg font-semibold mb-2">Transform Your Finances</h4>
          <p className="text-sm">
            We&#39;re creating a world where financial management is seamless and rewarding. Imagine earning up to 4x points on purchases, receiving luxury perks, and getting exclusive financial advice—Paylinq is your partner for it all.
          </p>
          <div className={`mt-4 inline-block ${getBadgeStyle(2)} text-white px-3 py-1 rounded-full text-sm transition-colors duration-300`}>
            Future Vision
          </div>
        </motion.div>
      </div>
    </div>
  );
}