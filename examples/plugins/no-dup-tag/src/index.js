const { createHTMLLintPlugin } = require('../../../../packages/htmllinter');
const noDupTag = require('./rules/no-dup-tag');

module.exports = {
  [noDupTag.ruleName]: (op) => (html) =>
    createHTMLLintPlugin(html, noDupTag, op),
};
