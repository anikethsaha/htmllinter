const { join, extname } = require('path');
const { readFileSync } = require('fs');
const glob = require('glob');

const chalk = require('chalk');
const linter = require('./packages/htmllinter');

const help = chalk.yellowBright(`
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

const runCli = () => {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.warn(
      chalk.redBright(
        '[HTMLLINTER] no argument passed. Please provide the input file(s) atleast'
      )
    );
    process.stderr.write(help);
    process.exit(0);
  }

  const input = args[0];

  glob(input, (err, matches) => {
    if (err) {
      console.error(err);
      process.stderr.write(help);
      process.exit(0);
    }
    if (matches.length < 1) {
      console.warn(`[HTMLLINTER] no file found with input pattern : ${input}`);
      process.stderr.write(help);
      process.exit(0);
    }

    const config = getConfig(args);
    matches
      .filter(
        (filename) =>
          extname(filename) === '.html' || extname(filename) === '.HTML'
      )
      .map((ipFileName) => {
        console.log(`\n[HTMLLINTER] Checking ${ipFileName} \n`);

        const html = readFileSync(join(__dirname, ipFileName), 'utf8');
        linter.run(html, config);
      });
  });
};

// const input = fs.readFileSync(path.join(__dirname, './input.html'), 'utf8');

// linter.run(input, config);

const getConfig = (args) => {
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
    process.stderr.write(error);
    process.exit(1);
  }

  return config;
};

const getDefaultConfigFilePath = () => {
  return join(process.cwd(), 'htmllinter.config.js');
};

const getUserDefineConfigFilePath = (argv) => {
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

runCli();
