const { createHTMLLintPlugin } = require('../../../../packages/htmllinter');
const noDupTag = require('./rules/no-dup-tag');

module.exports = {
  [noDupTag.ruleName]: (html) => createHTMLLintPlugin(html, noDupTag),
};
