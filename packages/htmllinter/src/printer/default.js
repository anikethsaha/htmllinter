const table = require('text-table');

const chalk = require('chalk');

module.exports = (datas, ipFileName = null) => {
  console.log('\n', chalk.yellow(`Output for filename : ${ipFileName} \n`));

  const output = datas.map((data, idx) =>
    data.type === 'error'
      ? [
          chalk.gray(idx),
          data.msg,
          chalk.gray(data.ruleName),
          chalk.yellowBright(data.type),
        ]
      : [
          chalk.gray(idx),
          data.msg,
          chalk.gray(data.ruleName),
          chalk.red(data.type),
        ]
  );
  console.log(table(output));
};
