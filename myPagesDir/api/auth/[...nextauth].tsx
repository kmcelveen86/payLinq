// import NextAuth, { NextAuthOptions } from "next-auth";
// import EmailProvider from "next-auth/providers/email";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import nodemailer from "nodemailer";
// import GoogleProvider from "next-auth/providers/google";
// const prisma = new PrismaClient();

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma) as any,
//   secret: process.env.AUTH_SECRET,
//   providers: [
//     EmailProvider({
//       server: {
//         host: process.env.EMAIL_SERVER_HOST,
//         port: Number(process.env.EMAIL_SERVER_PORT),
//         auth: {
//           user: process.env.EMAIL_SERVER_USER,
//           pass: process.env.EMAIL_SERVER_PASSWORD,
//         },
//       },
//       from: process.env.EMAIL_FROM,
//       normalizeIdentifier(identifier: string): string {
//         // Get the first two elements only,
//         // separated by `@` from user input.
//         let [local, domain] = identifier.toLowerCase().trim().split("@");
//         // The part before "@" can contain a ","
//         // but we remove it on the domain part
//         domain = domain.split(",")[0];

//         // You can also throw an error, which will redirect the user
//         // to the error page with error=EmailSignin in the URL
//         if (identifier.split("@").length > 2) {
//           throw new Error("Only one email allowed");
//         }
//         return `${local}@${domain}`;
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, email }) {
//       const userExists = await prisma.user.findUnique({
//         where: {
//           email: user.email!,
//         }, //the user object has an email property, which contains the email the user entered.
//       });
//       if (userExists) {
//         return true; //if the email exists in the User collection, email them a magic login link
//       } else {
//         return "/register";
//       }
//     },
//     async redirect({ url, baseUrl }) {
//       return baseUrl;
//     },

//     async session({ session, token, user }) {
//       console.log("GREG LOOK!  ~ session ~ session:", session);
//       console.log("GREG LOOK!  ~ session ~ token:", token);
//       console.log("GREG LOOK!  ~ session ~ user:", user);
//       // Send properties to the client, like an access_token and user id from a provider.
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);
