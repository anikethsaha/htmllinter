import { createHTMLLintPlugin } from '@htmllinter/core';

import rule from './rule';

export default {
  // for rules that needs options/data from config, use like this
  [rule.ruleName]: (options = {}) => (html) =>
    createHTMLLintPlugin(html, rule, options),
};
