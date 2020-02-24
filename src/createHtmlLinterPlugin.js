const createhtmlLintPlugin = (tree, { ruleName, rule }) => {
  const reporter = [];
  const plugin = rule({}, reporter)(tree);
  tree.messages
    .filter((msg) => msg.htmlLinter !== undefined)
    .map((msg) => {
      const msgToPush = {};
      msgToPush[ruleName] = reporter;
      msg.htmlLinter = {
        ...msg.htmlLinter,
        ...msgToPush,
      };
      return msg;
    });

  return plugin;
};

module.exports = createhtmlLintPlugin;
