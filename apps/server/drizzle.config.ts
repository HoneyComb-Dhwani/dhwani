import path from 'path';
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: path.resolve(__dirname, '../../.env') });

export default defineConfig({
  out: './drizzle',
  schema: './src/database/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
