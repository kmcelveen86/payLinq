
import { prisma } from "./lib/prisma";

async function main() {
    console.log("Checking Prisma Client properties...");

    // Check if the property exists
    if ('paylinqTransaction' in prisma) {
        console.log("✅ prisma.paylinqTransaction exists!");
    } else {
        console.log("❌ prisma.paylinqTransaction is MISSING.");
    }

    if ('userWallet' in prisma) {
        console.log("✅ prisma.userWallet exists!");
    } else {
        console.log("❌ prisma.userWallet is MISSING.");
    }

    // List all keys that look like models (start with lowercase)
    const keys = Object.keys(prisma).filter(key => key[0] === key[0].toLowerCase() && !key.startsWith('$') && !key.startsWith('_'));
    console.log("\nAvailable models on prisma client:", keys.join(", "));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
