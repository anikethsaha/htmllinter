export default {
  ruleName: 'doctype-top',
  meta: {
    schema: {
      type: 'object',
      properties: {
        startingLineNumber: {
          type: 'integer',
          default: 1,
        },
      },
      additionalProperties: false,
    },
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = []) {
    const startingLineNumber = options.startingLineNumber || 1;
    return (tree) => {
      return tree.walk((node) => {
        console.log({ node });
        if (node.type === 'doctype') {
          if (node.location.line !== startingLineNumber) {
            reporter.push({
              node,
              message: `doctype should be at line no. ${startingLineNumber} but found at ${node.location.line}`,
            });
          }
        }
        return node;
      });
    };
  },
};
