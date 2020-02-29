const creatHTMLLintPlugin = require('../../createHtmlLinterPlugin');

const ruleName = 'no-bool-true-explicit-define-data-sharing';
// eslint-disable-next-line no-unused-vars
const rule = (options = {}, reporter = [], reportNode = []) => {
  return (tree) =>
    tree.walk((node) => {
      reporter.push(
        `DATA FROM 'htmllinter.config.js is : ${JSON.stringify(options)}`
      );

      return node;
    });
};

module.exports = {
  [ruleName]: (op) => (html) =>
    creatHTMLLintPlugin.default(html, { ruleName, rule }, op),
};
