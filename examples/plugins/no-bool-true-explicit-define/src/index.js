const creatHTMLLintPlugin = require('../../../../packages/htmllinter');
const noBoolTrueExplicitDefin = require('./rules/no-bool-true-explicit-define');

module.exports = {
  [noBoolTrueExplicitDefin.ruleName]: (html) =>
    creatHTMLLintPlugin(html, noBoolTrueExplicitDefin),
};
