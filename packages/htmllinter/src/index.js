import posthtml from 'posthtml';
import createHTMLLintPlugin from './createHtmlLinterPlugin';
import helperPluginEnd from './helperPluginEnd';
import helperPluginStart from './helperPluginStart';
import resolveExtends from './resolveExtends';
import resolveExternalPlugins from './resolveExternalPlugins';

const run = (html, config = {}) => {
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

export default {
  run,
  createHTMLLintPlugin,
};
