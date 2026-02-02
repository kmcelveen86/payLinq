
import { prisma } from "./lib/prisma";

async function main() {
    const email = "davisgreg1@gmail.com";
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, membershipTier: true, stripeCustomerId: true },
    });
    console.log("User Tier Info:", user);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
