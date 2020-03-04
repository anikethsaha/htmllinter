import { join, extname } from 'path';
import { readFileSync } from 'fs';
import glob from 'glob';
import Table from 'cli-table3';
import chalk from 'chalk';
import { run } from '../index';
import { error, info, success } from './logger';

import { getConfig } from './utils';

/**
 * Considering the errors to be none by default
 * if any one file has linting errors, we need to throw exit code 1
 */
let isError = false;

const runCli = async (cb) => {
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

    /**
     * Getting the filtered correct matches as we need the length in order to make the
     * linting async with cb as it is required to throw exit(1) if there is any error found
     * but this should happen at the last file
     */
    matches = matches
      .filter(
        (filename) =>
          extname(filename) === '.html' || extname(filename) === '.HTML'
      )
      .map((res) => res);

    matches.forEach(async (ipFileName, i) => {
      info(` Checking ${ipFileName} \n`);

      const html = readFileSync(join(process.cwd(), ipFileName), 'utf8');
      const lintDatas = await run(html, config);
      if (lintDatas.length === 0) {
        console.log('\n');
        success(`0 errors found for file ${ipFileName}\n`);
      } else {
        /**
         * Its enough to get the signal even  if any one of
         * the file is having linting issues
         */
        isError = lintDatas.some((lintData) => lintData.type === 'error');
      }
      createTable(lintDatas, ipFileName);
      if (i === matches.length - 1 && cb) {
        cb(isError);
      }
    });
  });
};

runCli((isErr) => {
  if (isErr) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});

const createTable = (datas, ipFileName = null) => {
  console.log('\n', chalk.yellow(`Output for filename : ${ipFileName} \n`));

  let table = new Table({
    head: ['Message', 'Rule Name', 'type'].map((e) => chalk.redBright(e)),
  });

  datas.forEach((data) =>
    data.type === 'error'
      ? table.push(
          [data.msg, data.ruleName, data.type].map((e) => chalk.yellowBright(e))
        )
      : table.push(
          [data.msg, data.ruleName, data.type].map((e) => chalk.red(e))
        )
  );
  console.log(table.toString());
};
