"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppleIcon from "@mui/icons-material/Apple";
import Google from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import SignUpForm from "@/components/SignUpForm";

const theme = createTheme();

export default function SignUp() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoogleSignUp = () => {
    // Implement Google sign-up logic here
    console.log("Google sign-up");
  };

  const handleAppleSignUp = () => {
    // Implement Apple sign-up logic here
    console.log("Apple sign-up");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <SignUpForm />
      </Container>
    </ThemeProvider>
  );
}
