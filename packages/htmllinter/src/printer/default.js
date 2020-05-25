// inspired from eslint's stylus formatter

const table = require('text-table');
const stripAnsi = require('strip-ansi');
const chalk = require('chalk');

module.exports = (datas, ipFileName = null) => {
  console.log('\n', chalk.yellow(`Output for filename : ${ipFileName} \n`));

  const output = datas.map((data, idx) => {
    const severity = data.severity || data.type;
    return severity === 'error'
      ? [
          chalk.gray(idx),
          `${chalk.red(data.node.location.line)}:${chalk.red(
            data.node.location.col
          )}`,
          data.message,
          chalk.gray(`${data.ruleName}/${data.subRuleName || ''}`),
          chalk.red(severity),
        ]
      : [
          chalk.gray(idx),
          `${chalk.red(data.node.location.line)}:${chalk.red(
            data.node.location.col
          )}`,
          data.message,
          chalk.gray(`${data.ruleName}/${data.subRuleName || ''}`),
          chalk.yellowBright(severity),
        ];
  });

  process.stdout.write(
    table(output, {
      stringLength(s) {
        return stripAnsi(s).length;
      },
    })
  );
};
