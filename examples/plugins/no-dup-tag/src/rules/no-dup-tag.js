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
      if (node.tag && Object.keys(docTagCount).includes(node.tag)) {
        docTagCount[node.tag] += 1;
        if (docTagCount[node.tag] > 1) {
          reporter.push(
            `the tag ${node.tag} is used ${
              docTagCount[node.tag]
            } times which is illegal`
          );
        }
      }

      return node;
    });
  };
};
const ruleName = 'no-dup-tag';

module.exports = { ruleName, rule };
