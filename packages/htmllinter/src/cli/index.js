import { join, extname } from 'path';
import { readFileSync } from 'fs';
import glob from 'glob';
import Table from 'cli-table3';
import chalk from 'chalk';
import { run } from '../index';
import { error, info, success } from './logger';

import { getConfig } from './utils';

let isError = false;

const runCli = async () => {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    error(
      'no argument passed. Please provide the input file(s) atleast',
      true,
      true
    );
  }

  const input = args[0];

  await glob(input, (err, matches) => {
    if (err) {
      error(err, true, true);
    }
    if (matches.length < 1) {
      error(`no file found with input pattern : ${input}`, false, true);
      process.exit(0);
    }

    const config = getConfig(args);
    matches = matches
      .filter(
        (filename) =>
          extname(filename) === '.html' || extname(filename) === '.HTML'
      )
      .map((res) => res);

    matches.forEach(async (ipFileName) => {
      info(` Checking ${ipFileName} \n`);

      const html = readFileSync(join(process.cwd(), ipFileName), 'utf8');
      const lintData = await run(html, config);
      if (lintData.length === 0) {
        console.log('\n');
        success(`0 errors found for file ${ipFileName}\n`);
      } else {
        isError = true;
      }
      createTable(lintData, ipFileName);
    });
  });
};

runCli();

const createTable = (datas, ipFileName = null) => {
  console.log('\n', chalk.yellow(`Filename : ${ipFileName} \n`));
  let table = new Table({
    head: ['Message', 'Rule Name'],
  });
  datas.forEach((data) => table.push([data.msg, data.ruleName]));
  console.log(table.toString());
};
