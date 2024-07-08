import prisma from "@/lib/prisma";

export async function getUserFromDb(email: string) {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return user;
  }

  // If no user is found or the password does not match, return null
  return null;
}
