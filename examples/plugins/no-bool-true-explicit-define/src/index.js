const creatHTMLLintPlugin = require('../../src/createHtmlLinterPlugin');
const noBoolTrueExplicitDefin = require('./rule/no-bool-true-explicit-define');

module.exports = {
  [noBoolTrueExplicitDefin.ruleName]: (html) =>
    creatHTMLLintPlugin(html, noBoolTrueExplicitDefin),
};
