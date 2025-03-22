"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { signInAction } from "@/app/actions";
import { getCsrfToken, signIn } from "next-auth/react";
import { AuthError } from "next-auth";
import {
  Mail,
  ArrowRight,
  LockKeyhole,
  CreditCard,
  Sparkles,
} from "lucide-react";

const SignInForm: React.FC = () => {
  const [isSignUpFlow, setIsSignUpFlow] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    getCsrfToken().then((token) => setCsrfToken(token || ""));
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      await signIn("sendgrid", {
        email: formData.get("email"),
        redirect: true,
        callbackUrl: "/user/dashboard",
      });
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AuthError) {
        return redirect(`/error=${error.type}`);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    // hidden: { y: 20, opacity: 1 },
    // visible: {
    //   y: 0,
    //   opacity: 1,
    //   transition: { type: "spring", stiffness: 500, damping: 54 },
    // },
  };

  const formContainerVariants = {
    signIn: { x: 0, opacity: 1 },
    signUp: { x: 0, opacity: 1 },
  };

  // Only render animations if client-side
  if (!isMounted) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <CircularProgress sx={{ color: "#2D9642" }} />
      </div>
    );
  }

  const handleOnSignUpClick = () => {
    setIsSignUpFlow((prev) => !prev);
    setEmail("");
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #2D9642 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #C28F49 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        {/* Animated particles */}
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute bg-white rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: index % 3 === 0 ? "2px" : index % 3 === 1 ? "3px" : "4px",
              height: index % 3 === 0 ? "2px" : index % 3 === 1 ? "3px" : "4px",
              background: index % 2 === 0 ? "#2D9642" : "#C28F49",
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        // variants={containerVariants}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-gray-700">
          {/* Logo Animation */}
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

          {/* Form header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUpFlow ? "signup-header" : "signin-header"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, staggerChildren: 0.2, delay: 0.2 }}
              className="mb-8 text-center"
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
                {`Welcome${isSignUpFlow ? `!` : ` back!`} `}
              </Typography>
              <Typography variant="body1" className="text-gray-300">
                {`${
                  isSignUpFlow ? "Create your account." : "Sign in to continue."
                }`}
              </Typography>
            </motion.div>
          </AnimatePresence>

          {/* Form Content with sliding transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUpFlow ? "signup" : "signin"}
              initial={{ opacity: 0, x: isSignUpFlow ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignUpFlow ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <form action={handleSubmit} className="flex flex-col space-y-4">
                <motion.div variants={itemVariants} className="flex-none">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={20} className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        "&.Mui-focused fieldset": {
                          borderColor: "#2D9642",
                        },
                        "&:hover fieldset": {
                          borderColor: "#2D9642",
                        },
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.2)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#2D9642",
                      },
                      mt: 1,
                      mb: 2,
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="flex-none">
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          "&.Mui-checked": {
                            color: "#C28F49",
                          },
                        }}
                      />
                    }
                    label="Remember me"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  />
                </motion.div>

                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />

                <motion.div
                  variants={itemVariants}
                  className="pt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    disabled={isLoading || !email}
                    sx={{
                      py: 2,
                      background:
                        "linear-gradient(90deg, #2D9642 0%, #C28F49 100%)",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow:
                        "0 4px 15px rgba(45, 150, 66, 0.3), 0 1px 3px rgba(45, 150, 66, 0.1)",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      borderRadius: "10px",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #236f34 0%, #b37f41 100%)",
                        boxShadow:
                          "0 7px 20px rgba(45, 150, 66, 0.4), 0 3px 8px rgba(45, 150, 66, 0.2)",
                      },
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "all 0.5s ease",
                      },
                      "&:hover:after": {
                        left: "100%",
                      },
                      "&.Mui-disabled": {
                        background: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.4)",
                      },
                    }}
                    className="relative group"
                  >
                    {isLoading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>{`${isSignUpFlow ? `Sign Up` : `Sign In`}`}</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          className="ml-2"
                        >
                          <ArrowRight size={20} />
                        </motion.div>
                      </Box>
                    )}
                  </Button>
                </motion.div>

                {/* Toggle between sign in and sign up */}
                <motion.div
                  variants={itemVariants}
                  className="pt-6 flex items-center justify-center"
                >
                  <Typography variant="body2" className="text-gray-400">
                    {`${
                      isSignUpFlow
                        ? `Already have an account? `
                        : `Don't have an account? `
                    }`}
                    <motion.span
                      className="font-semibold cursor-pointer"
                      style={{
                        background: "linear-gradient(90deg, #2D9642, #C28F49)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                      whileHover={{ scale: 1.05 }}
                      onClick={handleOnSignUpClick}
                    >
                      {`Sign ${isSignUpFlow ? `in` : `up`}`}
                    </motion.span>
                  </Typography>
                </motion.div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInForm;
