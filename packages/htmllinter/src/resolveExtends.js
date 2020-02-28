import resolveExternalPlugins from './resolveExternalPlugins';

let completeRules = {};

const resolveExtends = (extend, rules) => {
  let plugins = [];

  // disable rules
  completeRules = {
    ...completeRules,
    ...extend.rules,
    ...rules,
  };

  if (extend.extend && Object.keys(extend.extend).length > 0) {
    let pluginsFromExtend = resolveExtends(extend.extend, completeRules);
    plugins.push(...pluginsFromExtend);

    if (extend.extend.plugins.length > 0) {
      let pluginsFromExtendedExternalPlugins = resolveExternalPlugins(
        extend.plugins,
        completeRules
      );

      plugins.push(...pluginsFromExtendedExternalPlugins);
    }

    extend = extend.extend;
  }

  extend.plugins.forEach((pluginList) => {
    Object.keys(pluginList).forEach((ruleName) => {
      if (completeRules[ruleName] && completeRules[ruleName] !== 'off') {
        plugins.push(pluginList[ruleName]);
      }
    });
  });

  return plugins;
};

export default resolveExtends;
