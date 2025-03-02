import { createClient } from '@libsql/client';
import * as fs from 'fs';
import * as path from 'path';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import * as schema from './schema';

// Generate migration files
async function generateMigrations() {
  console.log('Generating migration files...');
  
  try {
    // Create a client for the existing database
    const client = createClient({
      url: 'file:pokidex.db',
    });
    
    // Create Drizzle instance
    const db = drizzle(client, { schema });
    
    // Define migration paths
    const migrationsFolder = path.join(process.cwd(), 'migrations');
    
    // Ensure migrations folder exists
    if (!fs.existsSync(migrationsFolder)) {
      fs.mkdirSync(migrationsFolder, { recursive: true });
    }
    
    // Generate migration files
    await migrate(db, { migrationsFolder });
    
    console.log('Migration files generated successfully');
  } catch (error) {
    console.error('Error generating migration files:', error);
    process.exit(1);
  }
}

generateMigrations(); 