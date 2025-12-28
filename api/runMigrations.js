import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';
import dotenv from 'dotenv';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

/**
 * Run all pending migrations in order
 */
async function runMigrations() {
  console.log('🔧 Starting database migrations...');

  try {
    // Read all migration files
    const files = fs.readdirSync(MIGRATIONS_DIR)
      .filter(f => f.endsWith('.sql'))
      .sort(); // Sort alphabetically to ensure order

    if (files.length === 0) {
      console.log('✅ No migrations to run');
      await pool.end();
      return;
    }

    for (const file of files) {
      const filePath = path.join(MIGRATIONS_DIR, file);
      const sql = fs.readFileSync(filePath, 'utf-8');

      try {
        console.log(`⏳ Running migration: ${file}`);
        await pool.query(sql);
        console.log(`✅ Completed: ${file}`);
      } catch (error) {
        // Skip if table already exists (migration already ran)
        if (error.code === '42P07' || error.message.includes('already exists')) {
          console.log(`⏭️  Skipped: ${file} (already exists)`);
        } else {
          throw error;
        }
      }
    }

    console.log('✅ All migrations completed successfully');
    await pool.end();
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigrations();
