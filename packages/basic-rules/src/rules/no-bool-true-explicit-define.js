export default {
  ruleName: 'no-bool-true-explicit-define',
  meta: {
    schema: {},
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = [], reportNode = []) {
    return (tree) =>
      tree.walk((node) => {
        const { attrs } = node;

        if (!attrs) {
          return node;
        }

        Object.keys(attrs)
          .filter((attr) => attrs[attr][0].content === 'true')
          .map((attr) => {
            reporter.push({
              message: `the attribute "${attr}" boolean value "true", use "<${node.name} ${attr}>" instead`,
              node,
            });
          });
        return node;
      });
  },
};
