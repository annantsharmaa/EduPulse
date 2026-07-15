import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
});

const env = envSchema.parse(process.env);

export const config = {
  port: parseInt(env.PORT, 10),
  nodeEnv: env.NODE_ENV,
  databaseUrl: env.DATABASE_URL,
  redisUrl: env.REDIS_URL,
  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    accessExpiry: env.JWT_ACCESS_EXPIRY,
    refreshExpiry: env.JWT_REFRESH_EXPIRY,
  },
  email: {
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT || '587', 10),
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  frontendUrl: env.FRONTEND_URL,
  rateLimit: {
    windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS, 10),
    maxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS, 10),
  },
};
