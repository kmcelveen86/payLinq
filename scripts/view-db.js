// scripts/view-db.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // View all users
  const users = await prisma.user.findMany();
  console.log("Users:", JSON.stringify(users, null, 2));

  // View sessions
  const sessions = await prisma.session.findMany();
  console.log("Sessions:", JSON.stringify(sessions, null, 2));

  // View accounts
  const accounts = await prisma.account.findMany();
  console.log("Accounts:", JSON.stringify(accounts, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
