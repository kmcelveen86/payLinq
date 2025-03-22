import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import React from "react";

type Props = {
  itemVariants: any;
};

export default function PointsExpirationWarning(props: Props) {
  const { itemVariants } = props;
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-5 border border-amber-600/30"
    >
      <div className="flex items-start">
        <div className="p-2 rounded-full bg-amber-500/20 mr-4">
          <Clock size={20} className="text-amber-500" />
        </div>
        <div>
          <h3 className="font-medium text-amber-400">
            {`Points Expiration Notice`}
          </h3>
          <p className="text-gray-300 text-sm mt-1">
            {`With the Freemium plan, your points expire after 18 months. Upgrade
            to Lifestyle or higher to extend your points' validity period.`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
