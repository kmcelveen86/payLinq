// "use client";
import React, { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

import AuthBackground from "@/components/auth/AuthBackground";
import AuthLogo from "@/components/auth/AuthLogo";
import AuthHeader from "@/components/auth/AuthHeader";
import MagicLinkForm from "@/components/auth/MagicLinkForm";
import CredentialsForm from "@/components/auth/CredentialsForm";
import AuthToggle from "@/components/auth/AuthToggle";

export type AuthMethod = "magic" | "credentials";

const SignInForm: React.FC = () => {
  const [isSignUpFlow, setIsSignUpFlow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [authMethod, setAuthMethod] = useState<AuthMethod>("magic");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render animations if client-side
  if (!isMounted) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <CircularProgress sx={{ color: "#2D9642" }} />
      </div>
    );
  }

  const handleSignUpToggle = () => {
    setIsSignUpFlow((prev) => !prev);
    setError(null);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AuthBackground />

      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-gray-700">
          <AuthLogo />
          <AuthHeader isSignUpFlow={isSignUpFlow} />

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Alert
                severity="error"
                sx={{ bgcolor: "rgba(211, 47, 47, 0.15)" }}
              >
                {error}
              </Alert>
            </motion.div>
          )}

          {/* Form Content */}
          {authMethod === "magic" ? (
            <MagicLinkForm
              isSignUpFlow={isSignUpFlow}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setError={setError}
              setAuthMethod={setAuthMethod}
            />
          ) : (
            <CredentialsForm
              isSignUpFlow={isSignUpFlow}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setError={setError}
              setAuthMethod={setAuthMethod}
            />
          )}

          {/* Toggle between sign in and sign up */}
          <AuthToggle
            isSignUpFlow={isSignUpFlow}
            onToggle={handleSignUpToggle}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SignInForm;
