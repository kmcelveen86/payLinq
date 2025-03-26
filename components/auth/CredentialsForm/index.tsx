// "use client";
// import React, { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
// import { FormControlLabel, Checkbox, Typography } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";

// import EmailField from "../EmailField";
// import PasswordField from "../PasswordField";
// import TermsCheckBox from "../TermsCheckBox";
// import SubmitButton from "../SubmitButton";
// import AuthDivider from "../AuthDivider";
// import AuthMethodToggle from "../AuthMethodToggle";
// import type { AuthMethod } from "@/components/auth/SignInForm";

// interface CredentialsFormProps {
//   isSignUpFlow: boolean;
//   isLoading: boolean;
//   setIsLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
//   setAuthMethod: (method: AuthMethod) => void;
// }

// const CredentialsForm: React.FC<CredentialsFormProps> = ({
//   isSignUpFlow,
//   isLoading,
//   setIsLoading,
//   setError,
//   setAuthMethod,
// }) => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState<string | null>(null);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const validatePasswords = () => {
//     if (password !== confirmPassword) {
//       setPasswordError("Passwords do not match");
//       return false;
//     }
//     setPasswordError(null);
//     return true;
//   };

//   const handleCredentialsSignIn = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       setError(null);

//       const result = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (result?.error) {
//         setError("Invalid email or password");
//         setIsLoading(false);
//         return;
//       }

//       router.push("/user/dashboard");
//     } catch (error) {
//       setIsLoading(false);
//       setError("An error occurred during sign in");
//       console.error("Sign in error:", error);
//     }
//   };

//   const handleCredentialsSignUp = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       setError(null);

//       if (!agreeToTerms) {
//         setError("You must agree to the terms and conditions");
//         setIsLoading(false);
//         return;
//       }

//       if (!validatePasswords()) {
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "Registration failed");
//         setIsLoading(false);
//         return;
//       }

//       // Add a small delay to ensure the database has time to commit
//       // TODO: Code smell - replace with a more robust solution but for now it works
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Auto sign-in after successful registration
//       const signInResult = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//         callbackUrl: "/user/dashboard",
//       });

//       if (signInResult?.error) {
//         // components/auth/CredentialsForm.tsx (continued)
//         setError(
//           "Registration successful but sign-in failed. Please sign in manually."
//         );
//         setIsLoading(false);
//         return;
//       }

//       if (signInResult?.ok) {
//         router.push("/user/dashboard");
//         return;
//       }

//       setError("Registration successful but sign-in failed unexpectedly");
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Registration error:", error);
//       setIsLoading(false);
//       setError("An error occurred during registration");
//     }
//   };

//   const handleSubmit = isSignUpFlow
//     ? handleCredentialsSignUp
//     : handleCredentialsSignIn;

//   return (
//     <AnimatePresence mode="wait">
//       <motion.form
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: 20 }}
//         transition={{ duration: 0.3 }}
//         onSubmit={handleSubmit}
//         className="flex flex-col space-y-4"
//       >
//         <EmailField email={email} setEmail={setEmail} />

//         <PasswordField
//           password={password}
//           setPassword={setPassword}
//           autoComplete={isSignUpFlow ? "new-password" : "current-password"}
//         />

//         {isSignUpFlow && (
//           <>
//             <PasswordField
//               password={confirmPassword}
//               setPassword={setConfirmPassword}
//               label="Confirm Password"
//               error={passwordError}
//               autoComplete="new-password"
//             />

//             <TermsCheckBox
//               agreeToTerms={agreeToTerms}
//               setAgreeToTerms={setAgreeToTerms}
//             />
//           </>
//         )}

//         {!isSignUpFlow && (
//           <motion.div className="flex-none">
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   sx={{
//                     color: "rgba(255,255,255,0.5)",
//                     "&.Mui-checked": {
//                       color: "#C28F49",
//                     },
//                   }}
//                 />
//               }
//               label="Remember me"
//               sx={{ color: "rgba(255,255,255,0.7)" }}
//             />
//           </motion.div>
//         )}

//         <SubmitButton
//           isLoading={isLoading}
//           isDisabled={
//             !email ||
//             !password ||
//             (isSignUpFlow && (!confirmPassword || !agreeToTerms))
//           }
//           text={isSignUpFlow ? "Create Account" : "Sign In"}
//         />

//         {!isSignUpFlow && (
//           <motion.div className="pt-2 text-center">
//             <Typography
//               variant="body2"
//               className="text-[#C28F49] hover:underline cursor-pointer"
//             >
//               Forgot password?
//             </Typography>
//           </motion.div>
//         )}

//         <AuthDivider />

//         <AuthMethodToggle
//           currentMethod="credentials"
//           setAuthMethod={setAuthMethod}
//           isSignUpFlow={isSignUpFlow}
//         />
//       </motion.form>
//     </AnimatePresence>
//   );
// };

// export default CredentialsForm;
