import NextAuth from "next-auth";
import Sendgrid from "next-auth/providers/sendgrid";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import type { Provider } from "next-auth/providers";
import type { DefaultSession, User as NextAuthUser } from "next-auth";
import { compare } from "bcryptjs";

const adapter = PrismaAdapter(prisma);

// First, update the AdapterUser interface
// declare module "@auth/core/adapters" {
//   interface AdapterUser {
//     firstName?: string | null;
//     lastName?: string | null;
//     membershipTier?: string | null;
//     dateOfBirth?: Date | null;
//     phoneNumber?: string | null;
//     address?: string | null;
//     city?: string | null;
//     state?: string | null;
//     postalCode?: string | null;
//     updatedAt?: string | null;
//     provider?: string | null;
//   }
// }

declare module "next-auth" {
  interface User {
    firstName?: string | null;
    lastName?: string | null;
    membershipTier?: string | null;
    dateOfBirth?: Date | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    updatedAt?: string | null;
    provider?: string | null;
  }

  interface Session {
    provider?: string;
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      membershipTier?: string | null;
      dateOfBirth?: Date | null;
      phoneNumber?: string | null;
      address?: string | null;
      city?: string | null;
      state?: string | null;
      postalCode?: string | null;
      updatedAt?: string | null;
    } & DefaultSession["user"];
  }
}
// declare module "next-auth" {
//   interface User {
//     firstName?: string | null;
//     lastName?: string | null;
//     membershipTier?: string | null;
//     dateOfBirth?: Date | null;
//     phoneNumber?: string | null;
//     address?: string | null;
//     city?: string | null;
//     state?: string | null;
//     postalCode?: string | null;
//     updatedAt?: string | null;
//   }
// }
declare module "@auth/core/adapters" {
  interface AdapterUser {
    firstName?: string | null;
    lastName?: string | null;
    membershipTier?: string | null;
    dateOfBirth?: Date | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    updatedAt?: string | null;
    provider?: string | null;
  }
}

const providers: Provider[] = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(
      credentials: Partial<Record<"email" | "password", unknown>>
    ) {
      const email = credentials?.email as string | undefined;
      const password = credentials?.password as string | undefined;

      if (!email || !password) {
        return null;
      }

      try {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
          select: {
            id: true,
            email: true,
            name: true,
            firstName: true,
            lastName: true,
            password: true,
            image: true,
            membershipTier: true,
            dateOfBirth: true,
            phoneNumber: true,
            address: true,
            updatedAt: true,
            city: true,
            state: true,
            postalCode: true,
            // Include any other fields you need
          },
        });

        if (!user || !user.password) {
          console.error("User not found or has no password");
          return null;
        }

        // Use the compare function from bcryptjs
        const isPasswordValid = await compare(
          credentials.password as string,
          user.password.toString()
        );

        if (!isPasswordValid) {
          return null;
        }

        // Return user without password
        const { password: _, membershipTier, ...userWithoutPassword } = user;

        // Ensure nullable fields are converted to undefined if null
        return {
          ...userWithoutPassword,
          membershipTier: membershipTier ?? undefined,
          dateOfBirth: user.dateOfBirth ?? undefined,
          updatedAt: user.updatedAt.toISOString(), // Convert Date to string
        };
      } catch (error) {
        console.error("Error in credentials authorize:", error);
        return null;
      }
    },
  }),
  Resend({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: process.env.AUTH_RESEND_EMAIL_FROM,
    sendVerificationRequest({
      identifier: email,
      url,
      provider: { server, from },
    }) {},
  }),
  Sendgrid({
    maxAge: 30 * 24 * 60 * 60, // 30 days
    apiKey: process.env.AUTH_SENDGRID_KEY,
    from: process.env.AUTH_SENDGRID_EMAIL_FROM,
    normalizeIdentifier(identifier: string): string {
      let [local, domain] = identifier.toLowerCase().trim().split("@");
      domain = domain.split(",")[0];
      if (identifier.split("@").length > 2) {
        throw new Error("Only one email allowed");
      }
      return `${local}@${domain}`;
    },
    name: "Email",
  }),
  Github,
  Apple,
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

/**
 * Determines if we should use JWT or Database session strategy
 * based on the provider type
 */
function getSessionStrategy(provider?: string) {
  // Always use JWT for credentials
  if (provider === "credentials") {
    return "jwt";
  }

  // Use database for all other providers (email, OAuth, etc.)
  return "database";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  adapter,

  // Session handling configuration
  session: {
    // Will be overridden in callbacks
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Callbacks to handle authentication flow
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },

    async jwt({ token, user, account }) {
      // Only runs for JWT strategy
      // Store user data in the token when they sign in
      if (user) {
        // Add all user fields to the token
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.updatedAt = user.updatedAt;
        token.image = user.image;
        token.membershipTier = user.membershipTier;
        token.dateOfBirth = user.dateOfBirth;
        token.phoneNumber = user.phoneNumber;
        token.address = user.address;
        token.city = user.city;
        token.state = user.state;
        token.postalCode = user.postalCode;

        // Track which provider was used
        if (account) {
          token.provider = account.provider;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      // Determine which strategy is being used based on available data
      const isJwtStrategy = !!token && !user;

      // If we don't have a session.user, initialize it
      if (!session.user) {
        session.user = {
          id: "",
          email: "",
          emailVerified: null,
        };
      }

      if (isJwtStrategy) {
        // JWT strategy (typically for credentials provider)
        // Copy data from token to session
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.image = token.image as string;
        session.user.membershipTier = token.membershipTier as string;
        session.user.dateOfBirth = token.dateOfBirth as Date;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.address = token.address as string;
        session.user.city = token.city as string;
        session.user.state = token.state as string;
        session.user.postalCode = token.postalCode as string;
        session.user.updatedAt = token.updatedAt as string;

        // Add provider info
        session.provider = token.provider as string;
      } else {
        // Database strategy (for OAuth, Email, etc.)
        // Data is already in session from the adapter
        session.user.id = user.id;
        session.user.email = user.email;
        // Other fields should already be there if the adapter is working

        // Add provider info if we have it
        if (user.provider) {
          session.provider = user.provider;
        }
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      return process.env.NODE_ENV === "production"
        ? "https://paylinq-seven.vercel.app/"
        : "http://localhost:3000";
    },
  },

  // For debugging
  debug: process.env.NODE_ENV !== "production",

  // Custom pages
  pages: {
    verifyRequest: "/auth/verify-request",
    signIn: "/auth/signin",
    newUser: "/user/profile-edit",
  },

  // Theme
  theme: {
    colorScheme: "auto",
    logo: "/logos/paylinq-logo-new.png",
  },
});

/**
 * Custom hook that determines the correct authentication method to use
 * This can be used in client components to adjust the UI accordingly
 */
export async function getAuthInfo() {
  const session = await auth();
  const provider = session?.provider || "unknown";
  const strategy = getSessionStrategy(provider);

  return {
    provider,
    strategy,
    isAuthenticated: !!session,
    user: session?.user || null,
  };
}
