import chalk from 'chalk';
import { help } from './utils';

export const error = (msg, exit = true, showHelp = true) => {
  process.stdout.write(`${chalk.bgRed('[HTMLLINTER]:')} ${chalk.red(msg)}`);
  if (showHelp) {
    process.stderr.write(help);
  }
  if (exit) {
    process.exit(0);
  }
};

export const info = (msg) => {
  process.stdout.write(
    `${chalk.bgGreen.white.bold('[HTMLLINTER] :')}${chalk.magenta(msg)}`
  );
};

export const success = (msg) => {
  process.stdout.write(
    `${chalk.bgRgb(0, 128, 0).bold('[HTMLLINTER] :')} ${chalk.green(msg)}`
  );
};
