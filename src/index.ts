import { resolve } from 'path';
import { logger } from './utilities/Logger';

require('dotenv/config');

const { exec } = require('child_process');
const app = require('./app');
const initalizeDatabase = require('./configs/DbConfig');

const port = process.env.PORT || 3000;
const dbName = process.env.DB_NAME;

const runMigrations = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    logger.info(`Running migrations...`);
    exec('npx db-migrate up', (error: any, stdout: string, stderr: string) => {
      if (error) {
        logger.error(`Error running migrations: ${stderr}`);
        reject(stderr);
      }

      if (stdout.includes('No migrations to run')) {
        logger.info(`No migrations applied. Project is up to date.`);
      } else {
        logger.info(`Migratios success : ${stdout}`);
      }
      resolve();
    });
  });
};

const startApp = async () => {
  try {
    await initalizeDatabase(dbName);

    await runMigrations();

    app.listen(port, () => {
      logger.start(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log('Error durig initialization:', error);
    process.exit(1);
  }
};

startApp();
