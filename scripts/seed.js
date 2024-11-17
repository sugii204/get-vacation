const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

const seedsDir = path.join(__dirname, '..', 'seeds');

async function validateTableBeforeSeeding(client, tableName) {
  const query = `SELECT COUNT(*) FROM ${tableName};`;
  const res = await client.query(query);

  if (parseInt(res.rows[0].count) > 0) {
    return false;
  }
  return true;
}

async function seedFromSQL(client, tableName) {
  const sqlFilePath = path.join(seedsDir, `${tableName}.sql`);

  if (!fs.existsSync(sqlFilePath)) {
    return;
  }

  const shouldSeed = await validateTableBeforeSeeding(client, tableName);

  if (!shouldSeed) {
    return;
  }

  const sqlQuery = fs.readFileSync(sqlFilePath, 'utf-8');

  try {
    await client.query('BEGIN');
    await client.query(sqlQuery);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
  }
}

async function main() {
  const tableName = process.argv[2];
  if (!tableName) {
    console.error('Please provide a table name.');
    process.exit;
  }

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
  });

  try {
    await client.connect();
    await seedFromSQL(client, tableName);
  } catch (error) {
  } finally {
    await client.end();
  }
}

main();
