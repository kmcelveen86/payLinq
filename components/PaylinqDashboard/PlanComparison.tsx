import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React from "react";

type Props = {
  itemVariants: any;
};

export default function PlanComparison(props: Props) {
  const { itemVariants } = props;
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Plan Comparison</h3>
        <button className="text-sm text-gray-400 hover:text-white flex items-center">
          View All Benefits <ChevronRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left pb-3">Feature</th>
              <th className="text-center pb-3 px-2">
                <div className="flex flex-col items-center">
                  <span className="text-gray-300 font-medium">White</span>
                  <span className="text-xs text-gray-400">Current</span>
                </div>
              </th>
              <th className="text-center pb-3 px-2">
                <div className="flex flex-col items-center">
                  <span className="text-gray-300">Silver</span>
                  <span className="text-xs text-gray-500">$20/mo</span>
                </div>
              </th>
              <th className="text-center pb-3 px-2">
                <div className="flex flex-col items-center">
                  <span className="text-[#2D9642]">Gold</span>
                  <span className="text-xs text-[#2D9642]">$50/mo</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="py-3 text-[#2D9642]">Everyday Points</td>
              <td className="py-3 text-center">
                <span className="text-gray-300 font-medium">1x</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-gray-300">2x</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-[#2D9642]">3x</span>
              </td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 text-gray-300">Dining & Travel Points</td>
              <td className="py-3 text-center">
                <span className="text-gray-300 font-medium">2x</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-gray-300">3x</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-[#2D9642]">4x</span>
              </td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 text-gray-300">Monthly Points Limit</td>
              <td className="py-3 text-center">
                <span className="text-gray-300 font-medium">10,000</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-gray-300">20,000</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-[#2D9642]">30,000</span>
              </td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 text-gray-300">Points Expiration</td>
              <td className="py-3 text-center">
                <span className="text-gray-300 font-medium">18 months</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-gray-300">24 months</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-[#2D9642]">36 months</span>
              </td>
            </tr>
            <tr>
              <td className="py-3 text-gray-300">Credit Reporting</td>
              <td className="py-3 text-center">
                <span className="text-gray-500 text-sm">Coming Soon</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-gray-300">✓</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-[#2D9642]">✓</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#2D9642] to-[#C28F49] text-white font-medium inline-flex items-center"
        >
          Compare All Plans <ChevronRight size={16} className="ml-1" />
        </motion.button>
      </div>
    </motion.div>
  );
}
