import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { signIn } from "next-auth/react";

const SignInForm = async () => {
  return (
    <form
      action={async (formData) => {
        await signIn('email', {
          redirect: true,
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