export default {
  ruleName: 'no-missing-alt',
  meta: {
    schema: {},
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = [], reportNode = []) {
    return (tree) =>
      tree.walk((node) => {
        if (node.type === 'tag' && node.name === 'img') {
          if (!node.attrs) {
            reporter.push({
              message: 'img element should have `alt` attribute',
              node,
            });

            return node;
          }
          if (!Object.keys(node.attrs).some((attr) => attr === 'alt')) {
            reporter.push({
              message: 'img element should have `alt` attribute',
              node,
            });
          }
        }
        return node;
      });
  },
};
