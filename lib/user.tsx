import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUserData() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const dbUser = await prisma.user.findFirst({
    where: { clerkId: user.id },
  });

  return dbUser;
}
