import { createClient } from '@libsql/client';
import * as fs from 'fs';
import * as path from 'path';

// Run migrations
async function runMigrations() {
  console.log('Running migrations...');
  
  try {
    // Create a client
    const client = createClient({
      url: 'file:pokidex.db',
    });
    
    // Check if the users table already exists
    const tableCheck = await client.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='users'
    `);
    
    // Only run migrations if the users table doesn't exist
    if (tableCheck.rows.length === 0) {
      // Read the migration file
      const migrationPath = path.join(process.cwd(), 'migrations', '0000_initial.sql');
      const migrationSql = fs.readFileSync(migrationPath, 'utf8');
      
      // Execute the migration
      await client.execute(migrationSql);
      console.log('Migrations completed successfully');
    } else {
      console.log('Tables already exist, skipping migrations');
    }
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations(); 