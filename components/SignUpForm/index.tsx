import React from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Avatar,
  Box,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Google } from "@mui/icons-material";
import { registerUser } from "@/database/actions";

const SignUpForm = async () => {
  return (
    <form
      action={async (formData) => {
        await signIn()
        // await registerUser({
        //   email: formData.get("email") as string,
        //   name: `${formData.get("firstName")} ${formData.get("lastName")}`,
        // });
      }}>
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
          Sign Up
        </Typography>
        <Box component="div" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          {/* <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1, bgcolor: "#DB4437", color: "white" }}
            onClick={handleGoogleSignUp}
            startIcon={<Google />}>
            Sign up with Google
          </Button> */}
          {/* <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, bgcolor: "black", color: "white" }}
            onClick={handleAppleSignUp}
            startIcon={<AppleIcon />}>
            Sign up with Apple
          </Button> */}
          <Grid container justifyContent="center">
            <Grid item>
              <Button
                onClick={async () => {
                  await signIn();
                }}
                variant="text"
                color="primary"
                sx={{
                  marginBottom: 2,
                  marginRight: 2,
                  textDecoration: "underline",
                }}>
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mt: 2 }}>
          Go Back
        </Button> */}
      </Box>

      {/* <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button> */}
    </form>
  );
};

export default SignUpForm;
