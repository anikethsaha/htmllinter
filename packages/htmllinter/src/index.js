import posthtml from 'posthtml';
import createHTMLLintPlugin from './createHtmlLinterPlugin';
import helperPluginStart from './helperPluginStart';
import resolveStandards from './resolveStandards';
import resolveExternalPlugins from './resolveExternalPlugins';

export const run = (html = '', config = {}) => {
  const plugins = [helperPluginStart];
  if (config.standard) {
    if (
      typeof config.standard !== 'function' &&
      typeof config.standard !== 'object'
    ) {
      console.error(
        "[HTMLLINTER] type of 'config.standard' must be object (module), recieved ",
        typeof config.standard
      );
      return;
    }
    const pluginsFromStandard = resolveStandards(config.standard, config.rules);

    plugins.push(...pluginsFromStandard);
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
