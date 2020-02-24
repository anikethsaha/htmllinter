const posthtml = require('posthtml');
const createHTMLLintPlugin = require('./createHtmlLinterPlugin');
const helperPluginEnd = require('./helperPluginEnd');
const helperPluginStart = require('./helperPluginStart');

const { rule, ruleName } = require('./rules/no-empty-tag');

const rulesplugin = (tree) => createHTMLLintPlugin(tree, { ruleName, rule });

const posthtmlRunner = (html) => {
  const plugins = [helperPluginStart]
    .concat(rulesplugin)
    .concat(helperPluginEnd);
  return posthtml(plugins).process(html);
};

module.exports = {
  run: posthtmlRunner,
};
