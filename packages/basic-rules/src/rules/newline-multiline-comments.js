export default {
  ruleName: 'newline-multiline-comments',
  meta: {
    schema: {},
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = [], reportNode = []) {
    return (tree) =>
      tree.walk((node) => {
        if (node.type === 'comment' && node.content.split('\n').length > 1) {
          const { content } = node;
          if (!/^[\s]*\\n/gi.test(content)) {
            reporter.push({
              message: 'multiline comments should start with a new line',
              node,
            });
          }
        }

        return node;
      });
  },
};
