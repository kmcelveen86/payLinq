"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignInForm from "@/components/SignInForm";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const theme = createTheme();

  const handleGoBack = () => {
    // Add logic to navigate back to the previous page
    router.back();
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="div" sx={{ mt: 1 }}>
            <SignInForm />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Or,
            </Typography>
            {/* <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1, bgcolor: "#DB4437", color: "white" }}
            onClick={handleGoogleSignIn}
            startIcon={<GoogleIcon />}>
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, bgcolor: "black", color: "white" }}
            onClick={handleAppleSignIn}
            startIcon={<AppleIcon />}>
            Sign in with Apple
          </Button> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{ mt: 2 }}>
            Go Back
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
