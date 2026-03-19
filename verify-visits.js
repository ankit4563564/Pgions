const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkVisits() {
  try {
    const visits = await prisma.visitRequest.findMany({
      include: { listing: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    console.log('Recent Visits:', JSON.stringify(visits, null, 2));
    process.exit(0);
  } catch (e) {
    console.error('Failed to fetch visits:', e);
    process.exit(1);
  }
}

checkVisits();
