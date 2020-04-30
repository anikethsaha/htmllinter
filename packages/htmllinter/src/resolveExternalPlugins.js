import getCompatiblePlugin from './utils/getCompatiblePlugin';

export default (plugins, configRules) => {
  let pluginsToRet = [];

  let reportingType = {};
  plugins.map((plugin) => {
    Object.keys(plugin)
      .filter((pluginRule) => {
        if (!configRules) {
          console.warn(
            `[HTMLINTER] cant find rule declaration at the "config.rules" in config file. SKIPPING THE PLUGINS \n`
          );
          return false;
        }
        if (configRules && !configRules[pluginRule]) {
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
          if (rule[0] === 'off') {
            return false;
          }
          return true;
        }
        if (typeof rule === 'string' && rule === 'off') {
          return false;
        }
        return true;
      })
      .map((pluginRule) => {
        if (plugin[pluginRule]) {
          const rule = configRules[pluginRule];
          if (typeof rule === 'object') {
            /**
             * rule[0] : 'on' || 'off'
             * rule[1] : the whole data which needs to be passed.
             * just simply pass it as it is
             */
            if (rule[1] && rule.length > 1) {
              if (rule[0] === 'warn') {
                reportingType[pluginRule] = 'warn';
              } else {
                reportingType[pluginRule] = 'error';
              }
              pluginsToRet.push({ rule: plugin[pluginRule], data: rule[1] });
            } else {
              if (rule[0] === 'warn') {
                reportingType[pluginRule] = 'warn';
              } else {
                reportingType[pluginRule] = 'error';
              }
              const pluginToAdd = getCompatiblePlugin(plugin[pluginRule]);
              pluginsToRet.push(pluginToAdd);
            }
          } else {
            if (rule === 'warn') {
              reportingType[pluginRule] = 'warn';
            } else {
              reportingType[pluginRule] = 'error';
            }
            const pluginToAdd = getCompatiblePlugin(plugin[pluginRule]);
            pluginsToRet.push(pluginToAdd);
          }
        }
      });
  });
  return [pluginsToRet, reportingType];
};
