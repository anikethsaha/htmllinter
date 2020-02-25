import { join } from 'path';
import chalk from 'chalk';

export const getDefaultConfigFilePath = () => {
  return join(process.cwd(), 'htmllinter.config.js');
};

export const getUserDefineConfigFilePath = (argv) => {
  argv.forEach((arg, i) => {
    if (arg === '-c' || arg === '--config') {
      /**
       * arg[i + 1] is the value i.e path to config file.
       * Few things to check in order to get the exact file path name
       *
       * 1. it should be relative to `process.cwd()` -
       * 2. join(process.cwd(), arg[i+1],'htmllinter.config.js')
       *
       */
      const pathToConfig = arg[i + 1];
      return join(process.cwd(), pathToConfig, 'htmllinter.config.js');
    }
  });
};

export const getConfig = (args) => {
  let configFilePath;
  /**
   * args[0] - input pattern
   * args[1..args.length-2] - we can find the "-c" | "--config" flags
   *
   * args[n] - if n is the position for flag name [property]
   * args[n+1] - will be the value
   *
   * So generally loop through the args array
   *
   */

  if (args < 2) {
    configFilePath = getDefaultConfigFilePath();
  } else {
    configFilePath =
      getUserDefineConfigFilePath(args) || getDefaultConfigFilePath();
  }

  let config;

  try {
    config = require(configFilePath);
  } catch (error) {
    process.stderr.write(chalk.redBright(error));
    process.exit(1);
  }

  return config;
};

export const help = chalk.yellowBright(`
Usage :

$ htmllinter <input> [-c|--config]

input           - it is the input(html) file name, it accepts glob pattern.
                example :
                  - "input.html"
                  - "input"
                  - "/*.html"
                  - "."

Options
  -c, --config    - path to htmllinter.config.js.
                    default is "."
                    example :
                    - '.'
                    - './dir/'

Example

    $ htmllinter input.html
    $ htmllinter input -c ../
    $ htmllinter **/*
`);