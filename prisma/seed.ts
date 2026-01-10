import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import "dotenv/config";

// 1. Manually define the XAMPP connection details
const adapter = new PrismaMariaDb({
  host: '127.0.0.1',   // Use IP to avoid 'localhost' resolution lag
  port: 3306,
  user: 'root',        // Forces Prisma to use XAMPP root
  password: '',        // XAMPP default is blank
  database: 'tour_platform_db',
});

// 2. Pass the adapter to the client
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Emptying existing data...");
  // Use deleteMany to avoid primary key conflicts
  await prisma.booking.deleteMany();
  await prisma.tour.deleteMany();

  console.log("Adding your tour packages...");
  await prisma.tour.createMany({
    data: [
      { 
        title: 'Swat Valley Day Trip', 
        description: 'A beautiful journey to Kalam and Malam Jabba.', 
        netCost: 4347.83 // This results in Rs. 5000 with 15% markup
      },
      { 
        title: 'Hunza Luxury Tour', 
        description: '5 Days in Karimabad and Attabad Lake.', 
        netCost: 43478.26 // This results in Rs. 50,000 with 15% markup
      },
    ],
  });
  
  console.log("✅ Success! Your tours are now in XAMPP.");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error("❌ Seed Error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });