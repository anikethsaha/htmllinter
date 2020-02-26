const creatHTMLLintPlugin = require('../../createHtmlLinterPlugin');

const ruleName = 'no-bool-true-explicit-define';
// eslint-disable-next-line no-unused-vars
const rule = (options = {}, reporter = [], reportNode = []) => {
  return (tree) =>
    tree.walk((node) => {
      const { attrs } = node;
      if (!attrs) {
        return node;
      }
      Object.keys(attrs)
        .filter((attr) => attrs[attr] === 'true')
        .map((attr) => {
          reporter.push(`the attribute "${attr}" seems to be boolean with value "true", please consider removing the value as HTML will recognize
  it by default is only passed as "<${node.tag} ${attr}>...</${node.tag}>"
  `);
        });
      return node;
    });
};

module.exports = {
  [ruleName]: (html) => creatHTMLLintPlugin.default(html, { ruleName, rule }),
};
