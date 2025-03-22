import { motion } from "framer-motion";
import { ShoppingBag, Utensils, Plane } from "lucide-react";
import React from "react";

type Props = {
  itemVariants: any;
};

export default function MultiplierDetails(props: Props) {
  const { itemVariants } = props;
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Your Point Multipliers</h3>
        <span className="text-sm px-3 py-1 rounded-full bg-[#2D9642]/20 text-[#2D9642]">
          Freemium Benefits
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gray-700/50 border border-gray-600">
          <div className="flex items-center mb-3">
            <ShoppingBag size={20} className="text-gray-400 mr-2" />
            <h4 className="font-medium">Everyday Purchases</h4>
          </div>
          <div className="text-3xl font-bold text-white mb-1">1x</div>
          <p className="text-gray-400 text-sm">1 point per $1 spent</p>
        </div>

        <div className="p-4 rounded-xl bg-gray-700/50 border border-[#2D9642]/30">
          <div className="flex items-center mb-3">
            <Utensils size={20} className="text-[#2D9642] mr-2" />
            <h4 className="font-medium">Dining</h4>
          </div>
          <div className="text-3xl font-bold text-[#2D9642] mb-1">2x</div>
          <p className="text-gray-400 text-sm">2 points per $1 spent</p>
        </div>

        <div className="p-4 rounded-xl bg-gray-700/50 border border-[#C28F49]/30">
          <div className="flex items-center mb-3">
            <Plane size={20} className="text-[#C28F49] mr-2" />
            <h4 className="font-medium">Travel</h4>
          </div>
          <div className="text-3xl font-bold text-[#C28F49] mb-1">2x</div>
          <p className="text-gray-400 text-sm">2 points per $1 spent</p>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>For every 20,000 points earned, you can redeem for $100 in value.</p>
      </div>
    </motion.div>
  );
}
