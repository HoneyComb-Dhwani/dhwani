import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from 'src/config';

const pool = new Pool({
  connectionString: env.databaseUrl,
});

export const db = drizzle({ client: pool });
