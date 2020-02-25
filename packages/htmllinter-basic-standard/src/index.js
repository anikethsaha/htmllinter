const { creatHTMLLintPlugin } = require('htmllinter');
const noEmptyTag = require('./rules/no-empty-tag');
const noBoolTrueExplicitDefin = require('./rule/no-bool-true-explicit-define');

const noDupId = require('./rules/no-duplicate-id');

exports.plugins = {
  [noEmptyTag.ruleName]: (html) => creatHTMLLintPlugin(html, noEmptyTag),
  [noDupId.ruleName]: (html) => creatHTMLLintPlugin(html, noDupId),
  [noBoolTrueExplicitDefin.ruleName]: (html) =>
    creatHTMLLintPlugin(html, noBoolTrueExplicitDefin),
};

exports.rules = {
  'no-empty-tag': 'on',
  'no-duplicate-id': 'on',
  'no-bool-true-explicit-define': 'on',
};
