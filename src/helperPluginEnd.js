const helperPlugin = (tree) => {
  let lintingMsgs;
  tree.messages
    .filter((msg) => msg.htmlLinter !== undefined)
    .map((msg) => {
      lintingMsgs = msg.htmlLinter;
    });
  Object.keys(lintingMsgs).forEach((ruleName) => {
    lintingMsgs[ruleName].map((msg) => {
      console.log(`[HTMLLINTER] ${msg} \t | ${ruleName}`);
    });
  });
};

module.exports = helperPlugin;
