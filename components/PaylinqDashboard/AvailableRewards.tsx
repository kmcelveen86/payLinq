import { motion } from "framer-motion";
import { ChevronRight, Gift } from "lucide-react";
import React from "react";
import userData from "./data";

type Props = {
  userData: typeof userData;
  itemVariants: any;
};

export default function AvailableRewards(props: Props) {
  const { userData, itemVariants } = props;
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Available Rewards</h3>
        <button className="text-sm text-gray-400 hover:text-white flex items-center">
          See All <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userData.upcomingRewards.map((reward) => (
          <motion.div
            key={reward.id}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-gray-600"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-full bg-[#C28F49]/20">
                <Gift size={18} className="text-[#C28F49]" />
              </div>
              <span className="text-sm font-semibold px-2 py-1 rounded-full bg-gray-600">
                {reward.points.toLocaleString()} pts
              </span>
            </div>
            <h3 className="font-medium mt-3">{reward.name}</h3>
            <p className="text-gray-400 text-sm mt-1">{reward.discount}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 w-full py-2 text-sm text-center rounded-lg bg-gradient-to-r from-[#2D9642] to-[#C28F49] hover:from-[#27833a] hover:to-[#b37f41] transition-colors"
            >
              Redeem Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
