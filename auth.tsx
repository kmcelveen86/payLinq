import NextAuth from "next-auth";
import Sendgrid from "next-auth/providers/sendgrid";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import type { Provider } from "next-auth/providers";
// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.AUTH_SENDGRID_KEY!);

const adapter = PrismaAdapter(prisma);

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXTAUTH_DEV_URL
    : process.env.NEXTAUTH_URL;

const providers: Provider[] = [
  Sendgrid({
    maxAge: 30 * 24 * 60 * 60, // 30 days
    apiKey: process.env.AUTH_SENDGRID_KEY,
    from: process.env.AUTH_SENDGRID_EMAIL_FROM,
    normalizeIdentifier(identifier: string): string {
      console.log(
        "GREG LOOK!  ~ normalizeIdentifier ~ identifier:",
        identifier,
      );
      let [local, domain] = identifier.toLowerCase().trim().split("@");
      domain = domain.split(",")[0];
      if (identifier.split("@").length > 2) {
        throw new Error("Only one email allowed");
      }
      return `${local}@${domain}`;
    },
    name: "Email",
    // async sendVerificationRequest({ identifier, token, url, theme }) {
    //   const verificationLink = `${baseUrl}/verify?token=${token}`;
    //   const msg = {
    //     to: identifier,
    //     from: process.env.AUTH_SENDGRID_EMAIL_FROM!,
    //     subject: "Confirm your registration",
    //     text: "Please confirm your registration by clicking the following link:",
    //     html: `<strong>Please verify your email by clicking on the following link: <a href="${verificationLink}">${verificationLink}</a></strong>`,
    //   };

    //   try {
    //     await sgMail.send(msg);
    //     console.log("Confirmation email sent successfully");
    //   } catch (error) {
    //     console.error("Error sending confirmation email", error);
    //   }
    // },
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "database",
  },
  adapter: adapter,
  providers,
  callbacks: {
    async signIn({ user, account, email, profile }) {
      const userExists = await prisma.user.findUnique({
        where: {
          email: user.email!,
        },
      });
      if (userExists) {
        return true;
      } else {
        return true;
      }
    },
    async redirect({ url, baseUrl }) {
      return process.env.NODE_ENV === "production"
        ? "https://paylinq-seven.vercel.app/"
        : "http://localhost:3000";
      // if (url.startsWith(baseUrl)) {
      //   return url;
      // } else if (url.startsWith("/")) {
      //   return new URL(url, baseUrl).toString();
      // }
      // return baseUrl;
    },
    session({ session, token, user, trigger, newSession }) {
      return session;
    },
  },
  events: {
    async signIn(message) {
      // update the accounts table with the data from message
      // if (message.isNewUser && message.account?.providerAccountId) {
      //   if (adapter) {
      //     await adapter.linkAccount({
      //       type: message.account.type,
      //       userId: message.account.userId ?? "",
      //       providerAccountId: message.account.providerAccountId,
      //     });
      //   }
      // }
    },
    // async createUser({ user }) {
    //   console.log("GREG LOOK!  ~ createUser ~ user:", user);
    // },
  },
  debug: process.env.NODE_ENV !== "production",
  pages: {
    verifyRequest: "/auth/verify-request",
    signIn: "/auth/signin",
    newUser: "/user/profile",
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    logo: "/logos/paylinq-logo-new.png", // Absolute URL to image
    // brandColor: "#00FF00", // Hex color code
    // buttonText: "#00FF00", // Hex color code
  },
});
