"use client";
import { useRef } from "react";
// import { signInAction } from "@/app/actions";
import { providerMap } from "@/auth";
import { signIn } from "next-auth/react";
// import SignInButton from "@/components/SignInButton";
import SignInInput from "@/components/SignInInput";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";

export default function SignIn() {
  const emailProvider = Object.values(providerMap).filter(
    (p) => p.id === "sendgrid",
  );
  const oauthProviders = Object.values(providerMap).filter(
    (p) => p.id !== "sendgrid",
  );
  const emailRef = useRef<HTMLInputElement>(null);

  // const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
  //   e,
  // ) => {
  //   e.preventDefault();
  //   if (emailRef.current && emailRef.current.value) {
  //     try {
  //       await signIn("email", {
  //         redirect: true,
  //         callbackUrl: "/",
  //       });
  //     } catch (error) {
  //       if (error instanceof AuthError) {
  //         // Handle specific NextAuth.js errors
  //         console.error("SignIn error:", error);
  //       } else {
  //         // Handle other errors
  //         console.error("SignIn error:", error);
  //       }
  //     }
  //   }
  // };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (emailRef.current) {
      emailRef.current.value = e.target.value;
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh">
        {emailProvider.map((provider) => {
          return (
            <div key={provider.id}>
              <SignInForm />
              {/* <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleEmailChange}
                  inputRef={emailRef}
                />
                <button
                  onClick={handleSubmit}
                  className="flex justify-center items-center px-4 mt-2 space-x-2 w-full h-12 text-base font-light text-white rounded-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-hidden bg-zinc-800 hover:bg-zinc-900 focus:ring-zinc-800">
                  <span>Sign in with your email</span>
                </button>
              </div> */}
            </div>
          );
        })}
        <div className="flex gap-2 items-center my-4 w-36">
          <div className="flex-1 bg-neutral-300 h-[1px]" />
          <span className="text-xs leading-4 uppercase text-neutral-500">
            or
          </span>
          <div className="flex-1 bg-neutral-300 h-[1px]" />
        </div>
        {oauthProviders.map((provider) => {
          return (
            // <form
            //   key={provider.id}
            //   action={async () => {
            //     "use server";
            //     try {
            //       await signIn(provider.id, { redirectTo: "/" });
            //     } catch (error) {
            //       if (error instanceof AuthError) {
            //         return redirect(`/?error=${error.type}`);
            //       }
            //       throw error;
            //     }
            //   }}>
            <button
              key={provider.id}
              type="submit"
              className="flex justify-center items-center px-4 mt-2 space-x-2 w-full h-12 text-base font-light text-white rounded-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-hidden bg-zinc-800 hover:bg-zinc-900 focus:ring-zinc-800">
              <span>Sign in with {provider.name}</span>
            </button>
            // </form>
          );
        })}
      </Box>
    </>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const csrfToken = await getCsrfToken();
//   return {
//     props: { csrfToken },
//   };
// }
