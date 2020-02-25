module.exports = {
  extend: '', // no-op
  /**
   * extends are nothing by group of plugins and rules.
   * rules will be defined in the plugins
   * htmllinter doesnt hold any rule in the core
   * so, everything is at extend level to start with
   * "rules" are used to control the plugins and pass data in it
   *
   *
   * EXAMPLE : "require("./htmllint-basic-config")"
   */

  plugins: [
    /**
     * This is the individuals plugins or can say RULES
     * A plugin will export a { ruleName, rule }
     * And they must be configured ("rules") from the "rules"
     * present in the "htmllinter.config.js" 's rule property
     * Must turn "on" in the "rules" in order to get them running
     *
     * EXAMPLE : "require("./no-bool-true-explicit-define")"
     */
  ],
  rules: {
    /**
     * EXAMPLE : "no-empty-tag": "on"
     * These rules will be overwride the rule for the
     * particular ruleName comming from the extend
     *
     * two cases for rules,
     * either off or want to pass any options
     * if 'options' , then it has to be array and then
     * second arg is options
     * else if 'off', then string
     * to disable a rule, it will be 'off'
     * in the code , check for the type string and value of arr[0]
     * to be 'off'

     */
    /**
     * Must have rules for plugins
     *
     * example "no-bool-true-explicit-define": "on"
     */
  },
};
