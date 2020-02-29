import resolveExternalPlugins from './resolveExternalPlugins';
import getCompatiblePlugin from './utils/getCompatiblePlugin';

let completeRules = {};

const resolveExtends = (extend, rules) => {
  // doing explicit checking instead of Object.assign in order to remember it in futre
  // why I did this !!! X-)
  extend.plugins = extend.plugins || [];
  extend.rules = extend.rules || {};
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
      const rule = completeRules[ruleName];

      if (rule && rule !== 'off') {
        /**
         * Consider this plugin to be added to posthmtl
         * but first check few things, like its type
         * if the type is `object`, then check for data and 'on' or 'off'
         * else if its 'string' type, then it will be loaded as it is not 'off'
         */
        if (typeof rule === 'object') {
          /**
           * the rule is an object ['on|off',{data?}]
           */
          if (rule[0] === 'on') {
            /**
             * check if the rule[1] exists
             */
            if (rule[1] && rule.length > 1) {
              /**
               * this is a data sharing plugin requesting to pass some data
               * present at rule[1], therefore, pass the whole rule[1]
               * eg : 'no-empty-tag' : ['on',{ignore : ['p']}]
               */

              plugins.push({ rule: pluginList[ruleName], data: rule[1] });
            } else {
              /**
               * This plugin should be added as it has 'on' at rule[0]
               * but with no data
               * eg : 'no-empty-tag' : ['on']
               */
              const pluginToAdd = getCompatiblePlugin(pluginList[ruleName]);
              plugins.push(pluginToAdd);
            }
          }
        } else {
          const pluginToAdd = getCompatiblePlugin(pluginList[ruleName]);
          plugins.push(pluginToAdd);
        }
      }
    });
  });

  return plugins;
};

export default resolveExtends;
