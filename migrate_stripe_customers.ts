
import { prisma } from "./lib/prisma";

async function main() {
    console.log("Starting migration of legacy Stripe Customer IDs...");

    // Find users with legacy ID but no relation
    // Prisma doesn't support "where relation is null" easily in findMany with complex conditions sometimes,
    // so we'll fetch users with stripeCustomerId and include the relation, then filter in JS.
    // Or use findMany where stripeCustomer is none.

    const usersToMigrate = await prisma.user.findMany({
        where: {
            stripeCustomerId: { not: null },
            stripeCustomer: { is: null }
        }
    });

    console.log(`Found ${usersToMigrate.length} users to migrate.`);

    for (const user of usersToMigrate) {
        if (!user.stripeCustomerId) continue;

        try {
            await prisma.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: user.stripeCustomerId
                }
            });
            console.log(`Migrated user ${user.email} (${user.id}) -> ${user.stripeCustomerId}`);
        } catch (e) {
            console.error(`Failed to migrate user ${user.id}:`, e);
        }
    }

    console.log("Migration complete.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
