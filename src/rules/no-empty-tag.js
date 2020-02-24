/* eslint-disable no-prototype-builtins */

module.exports = {
  ruleName: 'no-empty-tag',
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = [], reportNode = []) {
    return (tree) =>
      tree.walk((node) => {
        if (node.hasOwnProperty('tag') && !node.content) {
          reporter.push(`the tag < ${node.tag} > has no content.`);
          /**
           * TODO
           * reportNode.push(node);
           *
           */
        }
        return node;
      });
  },
};
