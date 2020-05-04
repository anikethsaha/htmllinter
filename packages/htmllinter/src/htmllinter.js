import posthtml from 'posthtml';
import helperPluginStart from './helperPluginStart';
import resolveExtends from './resolveExtends';
import resolveExternalPlugins from './resolveExternalPlugins';

export default (html = '', config = {}) => {
  const plugins = [];
  let reportingType = {};
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
    const [pluginsFromExtends, reportingTypeFromExtends] = resolveExtends(
      config.extend,
      config.rules
    );

    plugins.push(...pluginsFromExtends);
    reportingType = {
      ...reportingType,
      ...reportingTypeFromExtends,
    };
  }

  if (config.plugins) {
    if (typeof config.plugins !== 'object') {
      console.error(
        "[HTMLLINTER] type of 'config.plugins' must be array (module), recieved ",
        typeof config.plugins
      );
      return;
    }
    const [
      pluginsFromConfig,
      reportingTypeFromPlugins,
    ] = resolveExternalPlugins(config.plugins, config.rules);

    plugins.push(...pluginsFromConfig);
    reportingType = {
      ...reportingType,
      ...reportingTypeFromPlugins,
    };
  }

  let lintingData = [];

  const posthtmlReadyPlugins = plugins.map((plugin) => {
    if (typeof plugin.data !== 'undefined') {
      return plugin.rule(plugin.data);
    } else {
      return plugin;
    }
  });

  return posthtml([helperPluginStart].concat(posthtmlReadyPlugins))
    .process(html)
    .then((result) => {
      let lintingMsgs;

      result.messages
        .filter((msg) => msg.htmlLinter !== undefined)
        .map((msg) => {
          lintingMsgs = msg.htmlLinter;
        });

      Object.keys(lintingMsgs).forEach((ruleName) => {
        lintingMsgs[ruleName].map((message) => {
          lintingData.push({
            message,
            ruleName,
            type: reportingType[ruleName],
          }); // using array as it will be easy to create table
        });
      });

      return lintingData;
    });
};
