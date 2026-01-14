import { PrismaClient } from '@prisma/client';

// We removed the MariaDB Adapter to prevent Vercel build crashes.
// Prisma will use the DATABASE_URL from your .env file automatically.
const prisma = new PrismaClient();

async function main() {
  console.log("Emptying existing data...");
  await prisma.booking.deleteMany();
  await prisma.tour.deleteMany();

  console.log("Adding your tour packages...");
  await prisma.tour.createMany({
    data: [
      { 
        title: 'Swat Valley Day Trip', 
        description: 'A beautiful journey to Kalam and Malam Jabba.', 
        netCost: 4347.83 
      },
      { 
        title: 'Hunza Luxury Tour', 
        description: '5 Days in Karimabad and Attabad Lake.', 
        netCost: 43478.26 
      },
    ],
  });
  
  console.log("✅ Seed completed.");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error("❌ Seed Error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
