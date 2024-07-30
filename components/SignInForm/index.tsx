"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { signInAction } from "@/app/actions";
import { getCsrfToken, signIn } from "next-auth/react";
import { AuthError } from "next-auth";

function SubmitButton() {
  return (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
      Sign In
    </Button>
  );
}
const SignInForm: React.FC = () => {
  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const email = formData.get("email") as string;
  //   console.log("GREG LOOK!  ~ SignInForm ~ email:", email);
  //   signInAction();
  // };
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token || ""));
  }, []);

  return (
    <form
      action={async (formData) => {
        try {
          await signIn("sendgrid", {
            email: formData.get("email"),
            redirect: true,
            callbackUrl: "/user/dashboard",
          });
        } catch (error) {
          if (error instanceof AuthError) {
            return redirect(`/error=${error.type}`); // TODO: MAKE THIS PAGE
          }
        }
      }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
