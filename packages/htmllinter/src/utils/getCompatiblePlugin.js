/**
 * This function takes a plugin, and try to load that as if its compatbile of having
 * data pass through it. If its in-compatible, load the original plugins
 * example :
 *
 * Compatible of taking data (options) :  (optionsFromConfig = {}) => html => core.createHTMLLintPlugin(html, noEmptyTag, optionsFromConfig)
 *
 * Not Compatible of taking data (options) :  html => core.createHTMLLintPlugin(html, noEmptyTag, optionsFromConfig)
 *
 *
 * @param  {Function} tmpPlugin - the plugin which needs to be safely return
 * @returns {Function}
 */
export default (tmpPlugin) => {
  try {
    const clone = tmpPlugin.bind({});
    tmpPlugin = clone();
    // eslint-disable-next-line no-empty
  } catch (err) {}
  return tmpPlugin;
};
