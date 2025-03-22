import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import React from "react";

type Props = {
  itemVariants: any;
  lockedFeatures: string[];
};

export default function LockedPremiumFeatures(props: Props) {
  const { itemVariants, lockedFeatures } = props;
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Premium Features</h3>
        <span className="text-sm px-3 py-1 rounded-full bg-gray-700 text-gray-300">
          Upgrade to Unlock
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lockedFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-700/50 border border-gray-600 flex items-center"
          >
            <Lock size={16} className="text-[#C28F49] mr-3" />
            <span className="text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#2D9642] to-[#C28F49] text-white font-medium inline-flex items-center"
        >
          Upgrade to Lifestyle <ArrowUpRight size={16} className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
}
