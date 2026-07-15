import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected');
  } catch (error) {
    logger.error('Database connection failed', error);
    throw error;
  }
};

export { prisma };
