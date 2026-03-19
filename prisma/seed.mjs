import { PrismaClient } from '@prisma/client';
import { listings } from '../data/listings.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create a dummy owner user
  const owner = await prisma.user.upsert({
    where: { email: 'owner@example.com' },
    update: {},
    create: {
      email: 'owner@example.com',
      name: 'Test Owner',
      role: 'owner',
    },
  });

  for (const l of listings) {
    // Check if listing already exists to prevent duplicates on re-seed
    const existing = await prisma.listing.findUnique({
      where: { id: l.id },
    });

    if (!existing) {
      await prisma.listing.create({
        data: {
          id: l.id,
          name: l.name,
          type: l.type,
          location: l.location,
          city: l.city || 'Bangalore',
          address: l.address,
          price: l.price,
          deposit: l.deposit,
          foodIncluded: l.foodIncluded,
          ac: l.ac,
          wifi: l.wifi,
          laundry: l.laundry || false,
          parking: l.parking || false,
          powerBackup: l.powerBackup || false,
          sharing: l.sharing,
          images: JSON.stringify(l.images || []),
          rules: JSON.stringify(l.rules || []),
          amenities: JSON.stringify(l.amenities || []),
          scamFlags: JSON.stringify(l.scamFlags || []),
          nearbyPlaces: JSON.stringify(l.nearbyPlaces || []),
          description: l.description || 'A great place to stay.',
          ownerName: l.ownerName || 'Verified Owner',
          ownerPhone: '+91 9876543210',
          ownerResponseTime: l.ownerResponseTime || 'Within an hour',
          ownerVerified: l.ownerVerified !== undefined ? l.ownerVerified : true,
          trustScore: l.trustScore || 85,
          avgRating: l.avgRating || 4.5,
          totalReviews: l.totalReviews || 12,
          viewsThisWeek: l.viewsThisWeek || 15,
          ownerId: owner.id,
        },
      });
      console.log(`Created listing: ${l.name}`);
    }
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
