import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // On Vercel: Use standard connection (usually via DATABASE_URL env variable)
  prisma = new PrismaClient();
} else {
  // Locally: Use XAMPP MariaDB Adapter
  const adapter = new PrismaMariaDb({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'tour_platform_db',
  });
  
  const globalForPrisma = global as unknown as { prisma: PrismaClient };
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };