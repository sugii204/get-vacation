const { table } = require('console');
const { create } = require('domain');
const fs = require('fs');
const path = require('path');

const seedsDir = path.join(__dirname, '..', 'seeds');

if (!fs.existsSync(seedsDir)) {
  fs.mkdirSync(seedsDir, { recursive: true });
}

function createSeedFile(tableName) {
  const seedFileName = `${tableName}.sql`;
  const filePath = path.join(seedsDir, seedFileName);

  if (fs.existsSync(filePath)) {
    console.log(`Seed file for table "${tableName} already exists.`);
    return;
  }

  const seedData = `--- Insert data into ${tableName} table
INSERT INTO ${tableName} (column1, column2)
VALUES  ('Value1', 'Value2),
('Value3', 'Value4);`;

  fs.writeFileSync(filePath, seedData, 'utf-8');
  console.log(`Seed file created for table "${tableName}": ${seedFileName}`);
}

const tableName = process.argv[2];
if (!tableName) {
  console.error('Please provide a table name.');
  process.exit(1);
}

createSeedFile(tableName);
