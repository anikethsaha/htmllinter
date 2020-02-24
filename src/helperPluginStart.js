const helperPlugin = (tree) => {
  tree.messages.push({
    htmlLinter: {},
  });
};

module.exports = helperPlugin;
