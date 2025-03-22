import { motion } from "framer-motion";
import { Shield, ArrowUpRight } from "lucide-react";
import React from "react";

export default function PlanUpgradeBanner(itemVariants: any) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3 }}
      className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-xl p-5 border border-gray-700 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2D9642] rounded-full opacity-10 transform translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#C28F49] rounded-full opacity-10 transform -translate-x-10 translate-y-10"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
        <div>
          <div className="flex items-center mb-2">
            <Shield size={18} className="text-[#2D9642] mr-2" />
            <h3 className="text-lg font-bold">Freemium Plan</h3>
            <span className="ml-2 px-2 py-0.5 bg-gray-600 rounded-full text-xs">
              Current Plan
            </span>
          </div>
          <p className="text-gray-300 mb-4 md:mb-0">
            You earn{" "}
            <span className="text-[#C28F49] font-medium">1x points</span> on
            everyday purchases,{" "}
            <span className="text-[#C28F49] font-medium">2x points</span> on
            dining & travel.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#2D9642] to-[#C28F49] text-white font-medium flex items-center whitespace-nowrap"
        >
          Upgrade Plan <ArrowUpRight size={16} className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
}
