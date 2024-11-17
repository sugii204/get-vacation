import { exec } from 'child_process';
import { argv, exit } from 'process';

const seederName = argv[2];

if (!seederName) {
  console.log('Please provide a seeder name.');
  exit(1);
}

exec(`npx db-migrate create ${seederName} --seed`, (error, stdout, stderr) => {
  if (error) {
    console.log(`Error creating seeder: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`Seeder created: ${stdout}`);
});
