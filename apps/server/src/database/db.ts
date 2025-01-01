import { Logger } from '@nestjs/common';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from 'src/config';

const pool = new Pool({
  connectionString: env.databaseUrl,
});

const logger = new Logger();

pool.on('connect', () => {
  logger.log('New client connected to PostgreSQL database');
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle PostgreSQL client', err);
});

pool.connect((err, client, release) => {
  if (err) {
    logger.error('Error connecting to PostgreSQL database', err.stack);
  } else {
    logger.log('Successfully connected to PostgreSQL database');
    release();
  }
});

export const db = drizzle({ client: pool });
