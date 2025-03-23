import React from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

interface AuthToggleProps {
  isSignUpFlow: boolean;
  onToggle: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ isSignUpFlow, onToggle }) => {
  return (
    <motion.div className="pt-6 flex items-center justify-center">
      <Typography variant="body2" className="text-gray-400">
        {isSignUpFlow ? "Already have an account? " : "Don't have an account? "}
        <motion.span
          className="font-semibold cursor-pointer"
          style={{
            background: "linear-gradient(90deg, #2D9642, #C28F49)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          whileHover={{ scale: 1.05 }}
          onClick={onToggle}
        >
          {isSignUpFlow ? "Sign In" : "Sign Up"}
        </motion.span>
      </Typography>
    </motion.div>
  );
};

export default AuthToggle;
