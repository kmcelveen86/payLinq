"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type SignInCredentials = {
  email: string;
  password: string;
};

type SignInMagicLink = {
  email: string;
};

type SignUpData = {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  useMagicLink?: boolean;
};

type AuthMethod = "credentials" | "magic";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, status, update: refreshSession } = useSession();
  const [authMethod, setAuthMethod] = useState<AuthMethod>("magic");

  // Get auth method from localStorage when component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMethod = localStorage.getItem(
        "authMethod"
      ) as AuthMethod | null;
      if (savedMethod) {
        setAuthMethod(savedMethod);
      }
    }
  }, []);

  // Set auth method with persistence
  const setAuthMethodWithPersistence = (method: AuthMethod) => {
    setAuthMethod(method);
    if (typeof window !== "undefined") {
      localStorage.setItem("authMethod", method);
    }
  };

  // Credentials sign in
  const signInWithCredentialsMutation = useMutation({
    mutationFn: async (credentials: SignInCredentials) => {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      refreshSession(); // Force session refresh
      router.push("/user/dashboard");
    },
    onError: (error) => {
      console.error("Sign in with credentials error:", error);
    },
  });

  // Magic link sign in
  const signInWithMagicLinkMutation = useMutation({
    mutationFn: async (data: SignInMagicLink) => {
      const result = await signIn("sendgrid", {
        email: data.email,
        redirect: false,
        callbackUrl: "/user/dashboard",
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      router.push("/auth/verify-request");
    },
    onError: (error) => {
      console.error("Sign in with magic link error:", error);
    },
  });

  // Sign up mutation
  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpData) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      return response.json();
    },
    onSuccess: async (data, variables) => {
      // Auto sign-in after successful registration
      if (variables.useMagicLink) {
        await signInWithMagicLinkMutation.mutateAsync({
          email: variables.email,
        });
      } else if (variables.password) {
        await signInWithCredentialsMutation.mutateAsync({
          email: variables.email,
          password: variables.password,
        });
      }
    },
    onError: (error) => {
      console.error("Sign up error:", error);
    },
  });

  // Sign out mutation
  const signOutMutation = useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/");
    },
  });

  return {
    // Auth method state
    authMethod,
    setAuthMethod: setAuthMethodWithPersistence,

    // Session info
    session,
    status,
    isAuthenticated: status === "authenticated",
    user: session?.user,
    refreshSession,

    // Sign in methods
    signInWithCredentials: signInWithCredentialsMutation.mutate,
    signInWithCredentialsAsync: signInWithCredentialsMutation.mutateAsync,
    isSigningInWithCredentials: signInWithCredentialsMutation.isPending,
    credentialsSignInError: signInWithCredentialsMutation.error,

    signInWithMagicLink: signInWithMagicLinkMutation.mutate,
    signInWithMagicLinkAsync: signInWithMagicLinkMutation.mutateAsync,
    isSigningInWithMagicLink: signInWithMagicLinkMutation.isPending,
    magicLinkSignInError: signInWithMagicLinkMutation.error,

    // Combined sign in method based on current authMethod
    signIn: (data: SignInCredentials | SignInMagicLink) => {
      if (authMethod === "credentials" && "password" in data) {
        signInWithCredentialsMutation.mutate(data as SignInCredentials);
      } else {
        signInWithMagicLinkMutation.mutate({ email: data.email });
      }
    },

    isSigningIn:
      signInWithCredentialsMutation.isPending ||
      signInWithMagicLinkMutation.isPending,
    signInError:
      signInWithCredentialsMutation.error || signInWithMagicLinkMutation.error,

    // Sign up methods
    signUp: (data: SignUpData) => {
      signUpMutation.mutate({
        ...data,
        useMagicLink: authMethod === "magic",
      });
    },
    signUpAsync: signUpMutation.mutateAsync,
    isSigningUp: signUpMutation.isPending,
    signUpError: signUpMutation.error,

    // Sign out
    signOut: signOutMutation.mutate,
    isSigningOut: signOutMutation.isPending,
  };
};
