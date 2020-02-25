import { join } from 'path';
import { readFileSync } from 'fs';

import { run } from '..';

try {
  const input = readFileSync(
    join(__dirname, process.argv.slice(2).join('')),
    'utf8'
  );
  run(input);
} catch (error) {
  console.error(error);
}
