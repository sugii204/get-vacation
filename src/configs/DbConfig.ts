import { Client } from 'pg';
import { logger } from '../utilities/Logger';

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

const initializeDatabase = async (dbname: string) => {
  await client.connect();
  const result = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [dbname],
  );

  if (result.rowCount === 0) {
    logger.info(`Database "${dbname}" not found.`);
    logger.info(`Creating "${dbname}" database ...`);
    await client.query(`CREATE DATABASE ${dbname}`);
    logger.info(`Database created.`);
  } else {
    logger.info(`Database "${dbname}" already exists`);
    logger.info(`Skipping initialization database process.`);
  }

  await client.end();
};

module.exports = initializeDatabase;
