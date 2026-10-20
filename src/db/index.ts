import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'
import { config } from 'dotenv';
import { Pool } from 'pg';

config({ path: ['.env.local', '.env'] });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('DATABASE_URL is not defined');
}

const pool = new Pool({
  connectionString: dbUrl,
})

export const db = drizzle(pool, { schema }); 