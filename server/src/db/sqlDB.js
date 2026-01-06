import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`


const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export { prisma, connectDB };
