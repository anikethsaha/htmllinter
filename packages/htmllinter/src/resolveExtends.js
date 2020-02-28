export default (extend, rules) => {
  let plugins = [];
  // disable rules
  const completeRules = {
    ...extend.rules,
    ...rules,
  };

  extend.plugins.forEach((pluginList) => {
    Object.keys(pluginList).forEach((ruleName) => {
      if (completeRules[ruleName] && completeRules[ruleName] !== 'off') {
        plugins.push(pluginList[ruleName]);
      }
    });
  });

  return plugins;
};
