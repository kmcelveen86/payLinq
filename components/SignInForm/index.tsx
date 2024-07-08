import React, { FormEvent } from "react";
import { TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { signInAction } from "@/app/actions";
import { signIn } from "next-auth/react";

function SubmitButton() {
  return (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
      Sign In
    </Button>
  );
}
const SignInForm: React.FC = async () => {
  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const email = formData.get("email") as string;
  //   console.log("GREG LOOK!  ~ SignInForm ~ email:", email);
  //   signInAction();
  // };

  return (
    <form
      action={async (formData) => {
        await signIn("email", {
          redirect: false,
          email: formData.get("email"),
        });
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
