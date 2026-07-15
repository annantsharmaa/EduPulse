import Redis from 'ioredis';
import { config } from '.';
import { logger } from '../utils/logger';

let redis: Redis;

export const connectRedis = async () => {
  redis = new Redis(config.redisUrl);
  redis.on('connect', () => logger.info('Redis connected'));
  redis.on('error', (err) => logger.error('Redis error', err));
  await redis.ping();
};

export const getRedis = (): Redis => {
  if (!redis) throw new Error('Redis not initialized');
  return redis;
};
