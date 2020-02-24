const creatHTMLLintPlugin = require('../../src/createHtmlLinterPlugin');
const { rule, ruleName } = require('./rules/no-empty-tag');

module.exports = {
  [ruleName]: (html) => creatHTMLLintPlugin(html, { rule, ruleName }),
};
