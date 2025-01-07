import { config } from 'dotenv';
import { z } from 'zod';
import path from 'path';

config({ path: path.resolve(__dirname, '../../../../.env') });

const envSchema = z.object({
  BACKEND_PORT: z.string().default('8000'),
  DATABASE_URL: z.string({
    required_error: 'DATABASE_URL is required',
  }),
  REDIS_URL: z.string({
    required_error: 'REDIS_URL is required',
  }),
  JWT_SECRET: z.string({
    required_error: 'JWT_SECRET is required',
  }),
  AWS_REGION: z.string({
    required_error: 'AWS_REGION is required',
  }),
  AWS_ACCESS_KEY_ID: z.string({
    required_error: 'AWS_ACCESS_KEY_ID is required',
  }),
  AWS_SECRET_ACCESS_KEY: z.string({
    required_error: 'AWS_SECRET_ACCESS_KEY is required',
  }),
  CACHE_DURATION: z.string().default('3600'),
});

const parseEnv = envSchema.safeParse(process.env);

if (!parseEnv.success) {
  console.error('❌ Invalid environment variables:', parseEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = {
  port: parseInt(parseEnv.data.BACKEND_PORT, 10),
  databaseUrl: parseEnv.data.DATABASE_URL,
  redisUrl: parseEnv.data.REDIS_URL,
  jwtSecret: parseEnv.data.JWT_SECRET,
  awsRegion: parseEnv.data.AWS_REGION,
  awsAccessKeyId: parseEnv.data.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: parseEnv.data.AWS_SECRET_ACCESS_KEY,
  cacheDuration: parseInt(parseEnv.data.CACHE_DURATION, 10),
} as const;
