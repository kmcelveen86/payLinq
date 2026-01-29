
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking for Merchants in the database...');
  try {
    const merchants = await prisma.merchant.findMany();
    console.log(`Found ${merchants.length} merchants:`);
    console.log(JSON.stringify(merchants, null, 2));
  } catch (error) {
    console.error('Error fetching merchants:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
