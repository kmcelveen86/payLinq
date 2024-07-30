"use server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.AUTH_SENDGRID_KEY as string);

function generateToken() {
  return crypto.randomBytes(20).toString("hex");
}

async function sendVerificationEmail(
  email: string,
  token: string,
): Promise<void> {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.NEXTAUTH_DEV_URL
      : process.env.NEXTAUTH_URL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined");
  }

  const verificationLink = `${baseUrl}/verify?token=${token}`;

  const msg = {
    to: email,
    from: process.env.AUTH_SENDGRID_EMAIL_FROM!, // Your verified sender email
    subject: "Verify your email",
    text: `Please verify your email by clicking on the following link: ${verificationLink}`,
    html: `<strong>Please verify your email by clicking on the following link: <a href="${verificationLink}">${verificationLink}</a></strong>`,
  };

  await sendgrid.send(msg);
}

export async function registerUser({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const token = generateToken();

  await sendVerificationEmail(email, token);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      verificationToken: token,
      tokenVerified: false,
    },
  });

  return newUser;
}
