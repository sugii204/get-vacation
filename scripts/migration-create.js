import { exec } from 'child_process';
import process from 'process';

const migrationName = process.argv[2];

if (!migrationName) {
  console.log(process.argv[2]);
  console.log('Please provide a migration name.');
  process.exit(1);
} else {
  console.log('--- Creating Migration Template File');
  console.log(`--- Migration Name : ${migrationName}`);
  exec(`npx db-migrate create ${migrationName}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`Error Creating Migration: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`Stderr: ${stderr}`);
      return;
    }
    console.log(`--- ${stdout}`);
  });
}
