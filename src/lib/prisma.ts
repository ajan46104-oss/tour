import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // Online (Vercel) - Uses the DATABASE_URL you just added
  prisma = new PrismaClient();
} else {
  // Local (XAMPP)
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      datasources: {
        db: {
          url: "mysql://root:@127.0.0.1:3306/tour_platform_db"
        },
      },
    });
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };