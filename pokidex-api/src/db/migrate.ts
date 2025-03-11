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
    
    // Check existing tables and their structure
    const tables = await client.execute(`
      SELECT name, sql FROM sqlite_master 
      WHERE type='table'
    `);
    
    console.log('Existing tables and their structure:');
    for (const table of tables.rows) {
      console.log(`\nTable: ${table.name}`);
      console.log('SQL:', table.sql);
    }
    
    // Check if pokedexes table exists
    const pokedexesTable = await client.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='pokedexes'
    `);
    
    if (pokedexesTable.rows.length === 0) {
      console.log('\nCreating pokedexes table...');
      await client.execute(`
        CREATE TABLE pokedexes (
          id text PRIMARY KEY NOT NULL,
          user_id text NOT NULL,
          name text NOT NULL,
          created_at integer NOT NULL,
          updated_at integer NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE cascade,
          CONSTRAINT pokedexes_user_id_unique UNIQUE (user_id)
        )
      `);
      console.log('Pokedexes table created successfully');
    }
    
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations(); 