import React from "react";
import { Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { LockKeyhole, Mail } from "lucide-react";
import type { AuthMethod } from "@/components/auth/SignInForm";

interface AuthMethodToggleProps {
  currentMethod: AuthMethod;
  setAuthMethod: (method: AuthMethod) => void;
  isSignUpFlow: boolean;
}

const AuthMethodToggle: React.FC<AuthMethodToggleProps> = ({
  currentMethod,
  setAuthMethod,
  isSignUpFlow,
}) => {
  const toggleMethod = () => {
    setAuthMethod(currentMethod === "magic" ? "credentials" : "magic");
  };

  const targetMethod = currentMethod === "magic" ? "credentials" : "magic";
  const iconComponent =
    targetMethod === "magic" ? (
      <Mail size={18} className="mr-2" />
    ) : (
      <LockKeyhole size={18} className="mr-2" />
    );

  const buttonText = isSignUpFlow
    ? `Sign Up with ${
        targetMethod === "magic" ? "Magic Link" : "Email & Password"
      }`
    : `Sign In with ${
        targetMethod === "magic" ? "Magic Link" : "Email & Password"
      }`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={toggleMethod}
      className="cursor-pointer"
    >
      <Button
        type="button"
        fullWidth
        variant="outlined"
        sx={{
          py: 2,
          borderColor: "rgba(255,255,255,0.2)",
          color: "white",
          borderRadius: "10px",
          "&:hover": {
            borderColor: "#2D9642",
            backgroundColor: "rgba(45, 150, 66, 0.05)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {iconComponent}
          <span>{buttonText}</span>
        </Box>
      </Button>
    </motion.div>
  );
};

export default AuthMethodToggle;
