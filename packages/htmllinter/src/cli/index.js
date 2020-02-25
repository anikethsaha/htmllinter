import { join, extname } from 'path';
import { readFileSync } from 'fs';
import glob from ' glob';
import { run } from 'htmllinter';
import { error, info } from './logger';

import { getConfig } from './utils';

const runCli = () => {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    error(
      'no argument passed. Please provide the input file(s) atleast',
      true,
      true
    );
  }

  const input = args[0];

  glob(input, (err, matches) => {
    if (err) {
      error(err, true, true);
    }
    if (matches.length < 1) {
      error('no file found with input pattern : ${input}', false, true);
      process.exit(0);
    }

    const config = getConfig(args);
    matches
      .filter(
        (filename) =>
          extname(filename) === '.html' || extname(filename) === '.HTML'
      )
      .map((ipFileName) => {
        info(` Checking ${ipFileName} \n`);

        const html = readFileSync(join(__dirname, ipFileName), 'utf8');
        run(html, config);
      });
  });
};

runCli();
