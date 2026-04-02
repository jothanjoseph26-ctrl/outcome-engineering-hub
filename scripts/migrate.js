import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.oybzybybwvduwcstklmd:Cuk0MjZtGHoi8mIi@aws-1-eu-central-2.pooler.supabase.com:6543/postgres',
});

async function runMigrations() {
  const migrationsDir = './supabase/migrations';
  
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log('Found migrations:', files);
  
  try {
    await client.connect();
    console.log('Connected to database (via pooler)');
    
    for (const file of files) {
      console.log(`\nRunning: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      
      try {
        await client.query(sql);
        console.log(`✓ ${file} - SUCCESS`);
      } catch (err) {
        console.log(`✗ ${file} - ERROR: ${err.message}`);
      }
    }
    
    console.log('\nRunning: schema.sql');
    const schemaSql = fs.readFileSync('./supabase/schema.sql', 'utf8');
    try {
      await client.query(schemaSql);
      console.log('✓ schema.sql - SUCCESS');
    } catch (err) {
      console.log(`✗ schema.sql - ERROR: ${err.message}`);
    }
    
  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    await client.end();
  }
  
  console.log('\nDone!');
}

runMigrations();