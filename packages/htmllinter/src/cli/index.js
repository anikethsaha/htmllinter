const path = require('path');
const fs = require('fs');

const linter = require('..');

try {
  const input = fs.readFileSync(
    path.join(__dirname, process.argv.slice(2).join('')),
    'utf8'
  );
  linter.run(input);
} catch (error) {
  console.error(error);
}
