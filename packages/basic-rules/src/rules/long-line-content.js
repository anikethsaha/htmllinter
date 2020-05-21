export default {
  ruleName: 'long-line-content',
  meta: {
    schema: {
      type: 'object',
      properties: {
        maxLen: {
          type: 'integer',
          default: 80,
        },
        elementMaxLen: {
          type: 'integer',
          default: 100,
        },
      },
      additionalProperties: false,
    },
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = [], reportNode = []) {
    const maxLen = options.maxLen || 80;
    const elementMaxLen = options.elementMaxLen || 100;
    return (tree) =>
      tree.walk((node) => {
        const { outerHTML } = node.location;
        if (node.type === 'tag' && outerHTML && outerHTML.trim().length > 0) {
          const pattern = new RegExp('<(.)*?>', 'ig');
          let match;
          while ((match = pattern.exec(outerHTML))) {
            if (match[0].length > elementMaxLen) {
              reporter.push({
                message: `element lenght is ${match[0].length}, allowed limit is ${elementMaxLen}`,
                node,
              });
            }
          }
        }

        if (node.type === 'text') {
          node.content
            .trim()
            .split('\n')
            .forEach((text) => {
              if (text.length > maxLen) {
                reporter.push({
                  message: `text length is ${text.length}, allowed limit is ${maxLen}.`,
                  node,
                });
              }
            });
        }

        return node;
      });
  },
};
