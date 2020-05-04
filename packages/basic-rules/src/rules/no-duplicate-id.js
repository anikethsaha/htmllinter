export default {
  ruleName: 'no-duplicate-id',
  meta: {
    schema: {},
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = [], reportNode = []) {
    let idCheck = {};
    return (tree) =>
      tree.walk((node) => {
        const { attrs } = node;
        if (!attrs) {
          return node;
        }
        const { id } = attrs;
        if (!id) {
          return node;
        }
        if (idCheck[id]) {
          reporter.push(`duplicate ids ${id} @ ${node.tag}`);
          return node;
        }

        idCheck[id] = true;
        return node;
      });
  },
};
