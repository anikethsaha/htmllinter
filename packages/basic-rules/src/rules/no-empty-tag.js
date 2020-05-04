/* eslint-disable no-prototype-builtins */

export default {
  ruleName: 'no-empty-tag',
  meta: {
    schema: {
      type: 'object',
      properties: {
        ignore: {
          type: 'array',
          default: [],
        },
      },
      additionalProperties: false,
    },
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = [], reportNode = []) {
    const { ignore } = options;
    return (tree) =>
      tree.walk((node) => {
        if (node.hasOwnProperty('tag') && !node.content) {
          if (ignore && ignore.includes(node.tag)) {
            return node;
          }
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
