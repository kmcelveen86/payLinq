"use client";
import React from "react";
import { Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

interface AuthHeaderProps {
  isSignUpFlow: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isSignUpFlow }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isSignUpFlow ? "signup-header" : "signin-header"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, staggerChildren: 0.2, delay: 0.2 }}
        className="mb-6 text-center"
      >
        <Typography
          variant="h4"
          component="h1"
          className="font-bold mb-2"
          sx={{
            background: "linear-gradient(90deg, #2D9642, #C28F49)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
          }}
        >
          {isSignUpFlow ? "Create Account" : "Welcome Back"}
        </Typography>
        <Typography variant="body1" className="text-gray-300">
          {isSignUpFlow
            ? "Join Paylinq and start your rewards journey"
            : "Sign in to access your rewards"}
        </Typography>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthHeader;
