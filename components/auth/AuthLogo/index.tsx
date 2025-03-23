"use client";
import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Sparkles } from "lucide-react";

const AuthLogo: React.FC = () => {
  return (
    <motion.div
      className="flex justify-center mb-6"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <CreditCard size={40} className="text-[#2D9642]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2"
        >
          <Sparkles size={16} className="text-[#C28F49]" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AuthLogo;
