/* eslint-disable no-prototype-builtins */

const SINGLE_TAG = new Set(['img', 'input']);

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
        if (typeof node.location.innerHTML === 'undefined') {
          return node;
        }
        if (
          node.type === 'tag' &&
          !node.content &&
          node.location.innerHTML.trim() === ''
        ) {
          if (
            (ignore && ignore.includes(node.name)) ||
            SINGLE_TAG.has(node.name)
          ) {
            return node;
          }
          reporter.push({
            message: `the tag < ${node.name} > has no content.`,
            node,
          });
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
