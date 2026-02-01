
import { prisma } from "./lib/prisma";

async function main() {
    const email = "davisgreg1+org10@gmail.com";
    console.log(`Checking user with email: ${email}`);

    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            stripeCustomer: true
        }
    });

    if (!user) {
        console.log("User not found!");
        return;
    }

    console.log("User Found:");
    console.log(`ID: ${user.id}`);
    console.log(`Legacy stripeCustomerId: ${user.stripeCustomerId}`);
    console.log(`Relation stripeCustomer:`, user.stripeCustomer);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
