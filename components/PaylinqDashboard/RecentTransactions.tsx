import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React from "react";
import userData from "./data";
import { Category, getCategoryColor } from "./utils";

type Props = {
  userData: typeof userData;
  itemVariants: any;
};

export default function RecentTransactions(props: Props) {
  const { userData, itemVariants } = props;
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Recent Transactions</h3>
        <button className="text-sm text-gray-400 hover:text-white flex items-center">
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {userData.recentTransactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            whileHover={{ x: 5 }}
            className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0"
          >
            <div className="flex items-center">
              <div
                className={`p-3 rounded-full mr-4 ${getCategoryColor(
                  transaction.category as Category
                )}`}
              >
                {transaction.icon}
              </div>
              <div>
                <p className="font-medium">{transaction.merchant}</p>
                <p className="text-gray-400 text-sm">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">${transaction.amount.toFixed(2)}</p>
              <div className="flex items-center justify-end">
                <p className="text-green-500 text-sm">
                  +{transaction.points} pts
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
