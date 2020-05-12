export default {
  ruleName: 'trailing-singleline-comments',
  meta: {
    schema: {},
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = [], reportNode = []) {
    return (tree) =>
      tree.walk((node) => {
        if (node.type === 'comment' && node.content.split('\n').length > 1) {
          const nonEmptyLines = node.content
            .split('\n')
            .filter((c) => c.trim() !== '');
          if (nonEmptyLines.length === 1) {
            reporter.push({
              message:
                'single line comments should start with same line as "<!--"',
              node,
            });
          }
        }

        return node;
      });
  },
};
