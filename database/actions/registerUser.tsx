'use server'
import prisma from "../../lib/prisma";

export async function registerUser({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  // Register function
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return newUser;
}
