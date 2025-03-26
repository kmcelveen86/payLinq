"use client";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
// import SignUpForm from "@/components/SignUpForm";

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
        {/* <SignUpForm /> */}
      </Container>
    </ThemeProvider>
  );
}
