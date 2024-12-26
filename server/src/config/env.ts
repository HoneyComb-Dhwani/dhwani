import { config } from 'dotenv';

config();

if (!process.env.PORT) {
  process.env.PORT = '8000';
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not set');
}

export const env = {
  port: parseInt(process.env.PORT, 10),
  databaseUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
};
