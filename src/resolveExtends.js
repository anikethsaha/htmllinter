module.exports = (extend, rules) => {
  if (!rules || rules.length === 0) {
    // no rules needs to be turn off or
    // no options is needs to be passed

    let plugins = [];
    Object.keys(extend.plugins).map((ruleName) =>
      plugins.push(extend[ruleName])
    );
    return plugins;
  } else {
    let plugins = [];
    // disable rules
    const completeRules = {
      ...extend.rules,
      ...rules,
    };
    Object.keys(completeRules)
      .filter((rule) => {
        if (typeof completeRules[rule] === 'object') {
          /**
           *  it cant turn off a rule if its passing an array
           *  it is probably passing some options to the plugin
           * Just leave them alone here XD
           */

          return true;
        } else {
          if (
            typeof completeRules[rule] === 'string' &&
            completeRules[rule] === 'off'
          ) {
            /**
             * Now this rule must be turn off, HOW ?
             * simple, every rule is a plugin, so simply dont push it to the
             * plugins array
             */
            return false;
          }

          /**
           *
           * Ok, pass this rule as it is probably 'on' or
           * 'warn'/'error' <-- this will be handle later
           * for now everything is error
           */
          return true;
        }
      })
      .map((rule) => {
        if (extend.plugins[rule] !== undefined) {
          /**
           * Rules may come from plugins as well,
           * standards are just grouping of individuals rules/plugins
           * and plugins/custom-rules will be handled in a separate metho
           */

          /**
           *
           *  TODO : Pass the  options from the rules config to the
           * plugin(rule) if the type is "Object"
           *
           */
          plugins.push(extend.plugins[rule]);
        }
      });

    return plugins;
  }
};

/**
 * DONE
 * Need to handle the case when, nothing is mention in the rule
 * about any plugin from the extends.
 *
 * i.e
 *
 * support basic standard is havinf two plugin
 *
 * 1. no-empty-tag
 * 2. no-dup-ids
 *
 * so now only one "no-dup-ids" is turned "off"
 *
 * so currently "no-empty-tag" is getting lost even if
 * nothing is mention about it in the rules.
 *
 * FIX :
 *
 * fixed by exporting two property from standards
 *
 * 1. plugins - required
 * 2. rules - required
 *
 * extend.rules are prepended at the config's rules as they
 * can be overwritable
 *
 */
