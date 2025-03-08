import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding traffic data...');

  await prisma.traffic.createMany({
    data: [
      { country: 'USA', vehicleType: 'Car', count: 500 },
      { country: 'UK', vehicleType: 'Bike', count: 150 },
      { country: 'Germany', vehicleType: 'Truck', count: 300 },
      { country: 'France', vehicleType: 'Bus', count: 120 },
      { country: 'India', vehicleType: 'Car', count: 700 },
    ],
  });

  console.log('✅ Traffic data seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding traffic data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
