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
import { motion } from "framer-motion";
import { signInAction } from "@/app/actions";
import { getCsrfToken, signIn } from "next-auth/react";
import { AuthError } from "next-auth";
import { Mail, ArrowRight, LockKeyhole } from "lucide-react";

const SignInForm: React.FC = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // Only render animations if client-side
  if (!isMounted) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <CircularProgress sx={{ color: "#2D9642" }} />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #2D9642 20%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #C28F49 20%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />

      {/* Form header */}
      <motion.div variants={itemVariants} className="mb-6 text-center">
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
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          className="text-gray-600"
        >
          Sign in to access your Paylinq account
        </Typography>
      </motion.div>

      <form action={handleSubmit}>
        <motion.div variants={itemVariants}>
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
                "&.Mui-focused fieldset": {
                  borderColor: "#2D9642",
                },
                "&:hover fieldset": {
                  borderColor: "#2D9642",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2D9642",
              },
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                sx={{
                  color: "#C28F49",
                  "&.Mui-checked": {
                    color: "#C28F49",
                  },
                }}
              />
            }
            label="Remember me"
          />
        </motion.div>

        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            fullWidth
            disabled={isLoading || !email}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              background: "linear-gradient(90deg, #2D9642 0%, #C28F49 100%)",
              color: "white",
              fontWeight: "bold",
              boxShadow:
                "0 4px 6px rgba(45, 150, 66, 0.12), 0 1px 3px rgba(45, 150, 66, 0.08)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #236f34 0%, #b37f41 100%)",
                boxShadow:
                  "0 7px 14px rgba(45, 150, 66, 0.15), 0 3px 6px rgba(45, 150, 66, 0.10)",
                transform: "translateY(-1px)",
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
                <span>Sign In</span>
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

        <motion.div variants={itemVariants} className="mt-4 text-center">
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-gray-500"
          >
            {`Don't have an account?`}
            <motion.span
              className="font-semibold cursor-pointer"
              style={{ color: "#2D9642" }}
              whileHover={{ scale: 1.05 }}
            >
              {`Sign up now`}
            </motion.span>
          </Typography>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default SignInForm;
