export default (tree, { ruleName, rule }, options = {}) => {
  const reporter = [];
  const reportNode = []; // T.O.D.O : not ready yet

  const plugin = rule(options, reporter, reportNode)(tree);
  tree.messages
    .filter((msg) => msg.htmlLinter !== undefined)
    .map((msg) => {
      const msgToPush = {};
      msgToPush[ruleName] = reporter;
      msg.htmlLinter = {
        ...msg.htmlLinter,
        ...msgToPush,
      };

      /**
       * TODO
       * handle `reportNode`
       */

      return msg;
    });

  return plugin;
};
