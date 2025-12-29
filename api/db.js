import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DATABASE_POOL_SIZE || '20'), // Increased from default 10 for high traffic
  min: parseInt(process.env.DATABASE_POOL_MIN || '5'),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.NODE_ENV === 'production'
    ? {
        rejectUnauthorized: true,
        ca: process.env.DATABASE_CA_CERT,
      }
    : false
});
