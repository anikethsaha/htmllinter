import posthtml from 'posthtml';
import createHTMLLintPlugin from './createHtmlLinterPlugin';
import helperPluginStart from './helperPluginStart';
import resolveExtends from './resolveExtends';
import resolveExternalPlugins from './resolveExternalPlugins';

export const run = (html = '', config = {}) => {
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
    const pluginsFromExtends = resolveExtends(config.extend, config.rules);

    plugins.push(...pluginsFromExtends);
  }
  if (config.plugins) {
    if (typeof config.plugins !== 'object') {
      console.error(
        "[HTMLLINTER] type of 'config.plugins' must be array (module), recieved ",
        typeof config.standard
      );
      return;
    }
    const pluginsFromConfig = resolveExternalPlugins(
      config.plugins,
      config.rules
    );
    plugins.push(...pluginsFromConfig);
  }

  let lintingData = [];

  return posthtml(plugins)
    .process(html)
    .then((result) => {
      let lintingMsgs;

      result.messages
        .filter((msg) => msg.htmlLinter !== undefined)
        .map((msg) => {
          lintingMsgs = msg.htmlLinter;
        });

      Object.keys(lintingMsgs).forEach((ruleName) => {
        lintingMsgs[ruleName].map((msg) => {
          lintingData.push({ msg, ruleName }); // using array as it will be easy to create table
        });
      });

      return lintingData;
    });
};

export { createHTMLLintPlugin };
