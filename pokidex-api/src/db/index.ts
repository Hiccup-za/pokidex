import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { createClient } from '@libsql/client';

// Initialize SQLite database
let db: ReturnType<typeof drizzle>;

// Helper function to initialize the database
export async function initializeDatabase() {
  console.log('Initializing database...');
  
  try {
    // Create a client
    const client = createClient({
      url: 'file:pokidex.db',
    });
    
    // Create Drizzle instance
    db = drizzle(client, { schema });
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Export the database instance
export { db }; 