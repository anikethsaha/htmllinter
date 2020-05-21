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
          const nonEmptyLines = node.content
            .split('\n')
            .filter((c) => c.trim() !== '');
          if (nonEmptyLines.length > 1) {
            const { content } = node;
            if (!/^[\s\t]*\n/g.test(content)) {
              reporter.push({
                message: 'multiline comments should start with a new line',
                node,
              });
            }
          }
        }

        return node;
      });
  },
};
