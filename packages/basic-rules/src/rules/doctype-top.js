export default {
  ruleName: 'doctype-top',
  meta: {
    schema: {
      type: 'object',
      properties: {
        startingLineNumber: 'integer',
        default: 1,
      },
      additionalProperties: false,
    },
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = [], reportNode = []) {
    return (tree) =>
      tree.walk((node) => {
        // console.log({ options });
        const startingLineNumber = options.startingLineNumber || 1;
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
  },
};
