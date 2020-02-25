const posthtml = require('posthtml');
const createHTMLLintPlugin = require('./createHtmlLinterPlugin');
const helperPluginEnd = require('./helperPluginEnd');
const helperPluginStart = require('./helperPluginStart');
const resolveExtends = require('./resolveExtends');
const resolveExternalPlugins = require('./resolveExternalPlugins');

const posthtmlRunner = (html, config = {}) => {
  const plugins = [helperPluginStart];
  if (config.extend) {
    if (
      typeof config.extend !== 'function' &&
      typeof config.extend !== 'object'
    ) {
      console.error(
        "[HTMLLINTER] type of 'config.extend' must be object (module), recieved ",
        typeof config.extend
      );
      return;
    }
    const pluginsFromExtend = resolveExtends(config.extend, config.rules);

    plugins.push(...pluginsFromExtend);
  }
  if (config.plugins) {
    if (typeof config.plugins !== 'object') {
      console.error(
        "[HTMLLINTER] type of 'config.plugins' must be array (module), recieved ",
        typeof config.extend
      );
      return;
    }
    const pluginsFromConfig = resolveExternalPlugins(
      config.plugins,
      config.rules
    );
    plugins.push(...pluginsFromConfig);
  }

  plugins.push(helperPluginEnd);
  return posthtml(plugins).process(html);
};

module.exports = {
  run: posthtmlRunner,
  createHTMLLintPlugin,
};
