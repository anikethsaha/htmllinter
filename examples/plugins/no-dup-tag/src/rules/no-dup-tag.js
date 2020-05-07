// eslint-disable-next-line no-unused-vars
const rule = function(options = {}, reporter = [], reportNode = []) {
  return function(tree) {
    let docTagCount = {
      html: 0,
      body: 0,
      head: 0,
      title: 0,
    };

    tree.walk((node) => {
      if (node.type !== 'tag') {
        return node;
      }

      if (Object.keys(docTagCount).includes(node.name)) {
        docTagCount[node.name] += 1;

        if (docTagCount[node.name] > 1) {
          reporter.push({
            message: `the tag ${node.name} is used ${
              docTagCount[node.name]
            } times which is illegal`,
            node,
          });
        }
      }

      return node;
    });
  };
};
const ruleName = 'no-dup-tag';

module.exports = { ruleName, rule };
