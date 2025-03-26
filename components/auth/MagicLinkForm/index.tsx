// "use client";
// import React, { FormEvent, useState } from "react";
// import { NextRouter } from "next/router";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { motion, AnimatePresence } from "framer-motion";

// import EmailField from "../EmailField";
// import TermsCheckBox from "../TermsCheckBox";
// import SubmitButton from "../SubmitButton";
// import AuthDivider from "../AuthDivider";
// import AuthMethodToggle from "../AuthMethodToggle";
// import type { AuthMethod } from "@/components/auth/SignInForm";

// interface MagicLinkFormProps {
//   isSignUpFlow: boolean;
//   isLoading: boolean;
//   setIsLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
//   setAuthMethod: (method: AuthMethod) => void;
// }

// const MagicLinkForm: React.FC<MagicLinkFormProps> = ({
//   isSignUpFlow,
//   isLoading,
//   setIsLoading,
//   setError,
//   setAuthMethod,
// }) => {
//   const [email, setEmail] = useState("");
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const router = useRouter();

//   const handleMagicLinkSignIn = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       setError(null);

//       const result = await signIn("sendgrid", {
//         email,
//         redirect: false,
//         callbackUrl: "/user/dashboard",
//       });

//       if (result?.error) {
//         setError("Failed to send magic link. Please try again.");
//         setIsLoading(false);
//         return;
//       }

//       router.push("/auth/verify-request");
//     } catch (error) {
//       setIsLoading(false);
//       setError("An error occurred during sign in");
//       console.error("Magic link sign in error:", error);
//     }
//   };

//   const handleMagicLinkSignUp = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       setError(null);

//       if (!agreeToTerms) {
//         setError("You must agree to the terms and conditions");
//         setIsLoading(false);
//         return;
//       }

//       // Create user first (without password)
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           useMagicLink: true,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "Registration failed");
//         setIsLoading(false);
//         return;
//       }

//       // Send magic link
//       const result = await signIn("sendgrid", {
//         email,
//         redirect: false,
//         callbackUrl: "/user/dashboard",
//       });

//       if (result?.error) {
//         setError(
//           "Account created but failed to send magic link. Please try signing in."
//         );
//         setIsLoading(false);
//         return;
//       }

//       router.push("/auth/verify-request");
//     } catch (error) {
//       setIsLoading(false);
//       setError("An error occurred during registration");
//       console.error("Magic link registration error:", error);
//     }
//   };

//   const handleSubmit = isSignUpFlow
//     ? handleMagicLinkSignUp
//     : handleMagicLinkSignIn;

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

//         {isSignUpFlow && (
//           <TermsCheckBox
//             agreeToTerms={agreeToTerms}
//             setAgreeToTerms={setAgreeToTerms}
//           />
//         )}

//         <SubmitButton
//           isLoading={isLoading}
//           isDisabled={!email || (isSignUpFlow && !agreeToTerms)}
//           text={`Sign ${isSignUpFlow ? "Up" : "In"} with Magic Link`}
//         />

//         <AuthDivider />

//         <AuthMethodToggle
//           currentMethod="magic"
//           setAuthMethod={setAuthMethod}
//           isSignUpFlow={isSignUpFlow}
//         />
//       </motion.form>
//     </AnimatePresence>
//   );
// };

// export default MagicLinkForm;
