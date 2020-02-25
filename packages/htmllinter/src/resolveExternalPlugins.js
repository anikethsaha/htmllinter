export default (plugins, configRules) => {
  let pluginsToRet = [];
  plugins.map((plugin) => {
    Object.keys(plugin)
      .filter((pluginRule) => {
        if (!configRules[pluginRule]) {
          console.warn(
            `[HTMLINTER] cant find rule declaration for '${pluginRule}' at the "config.rules" in config file. SKIPPING THE PLUGIN \n`
          );
          return false;
        }
        return true;
      })
      .filter((pluginRule) => {
        const rule = configRules[pluginRule];
        if (typeof rule === 'object') {
          return true;
        }
        if (typeof rule === 'string' && rule === 'off') {
          return false;
        }
        return true;
      })
      .map((pluginRule) => {
        if (plugin[pluginRule]) {
          pluginsToRet.push(plugin[pluginRule]);
        }
      });
  });
  return pluginsToRet;
};
