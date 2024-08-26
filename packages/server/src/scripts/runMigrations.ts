import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const runMigrations = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  const migrationsDir = path.resolve(__dirname, '../db/migrations');
  const migrationFiles = fs.readdirSync(migrationsDir);

  for (const file of migrationFiles) {
    const migrationPath = path.join(migrationsDir, file);
    const migrationSql = fs.readFileSync(migrationPath, 'utf8');
    await client.query(migrationSql);
    console.log(`Migration ${file} executed successfully.`);
  }

  await client.end();
};

runMigrations().catch((err) => {
  console.error('Error running migrations:', err);
  process.exit(1);
});
