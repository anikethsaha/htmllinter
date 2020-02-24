module.exports = (extend, rules) => {
  if (!rules || rules.length === 0) {
    // no rules needs to be turn off or
    // no options is needs to be passed

    let plugins = [];
    Object.keys(extend).map((ruleName) => plugins.push(extend[ruleName]));
    return plugins;
  } else {
    let plugins = [];
    // disable rules
    Object.keys(rules)
      .filter((rule) => {
        if (typeof rules[rule] === 'object') {
          /**
           *  it cant turn off a rule if its passing an array
           *  it is probably passing some options to the plugin
           *
           * Just leave them alone here XD
           */

          return true;
        } else {
          if (typeof rules[rule] === 'string' && rules[rule] === 'off') {
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
        plugins.push(extend[rule]);
      });

    /**
     * TODO
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
     * ?????
     *
     * Debug
     *
     * create the "no-dup-ids" rules and then work
     *
     */

    return plugins;
  }
};
