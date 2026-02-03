
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkId() {
    const targetId = 'cml616s050001xb85bppebc23';
    console.log(`Checking ID: ${targetId}`);

    console.log('Checking User table...');
    const user = await prisma.user.findUnique({
        where: { id: targetId }
    });
    console.log('User found:', !!user);

    console.log('Checking AffiliateClick table...');
    const click = await prisma.affiliateClick.findUnique({
        where: { id: targetId },
        include: { user: true }
    });
    console.log('Click found:', !!click);
    if (click) {
        console.log('Click details:', click);
    }
}

checkId()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
