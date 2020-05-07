/* eslint-disable no-unused-vars */
import { createHTMLLintPlugin } from '@htmllinter/core';

import noEmptyTag from './rules/no-empty-tag';
import noBoolTrueExplicitDefine from './rules/no-bool-true-explicit-define';
import noDupId from './rules/no-duplicate-id';
import noDupTag from './rules/no-duplicate-tag';

export default {
  // for rules that needs options/data from config, use like this
  [noEmptyTag.ruleName]: (optionsFromConfig = {}) => (html) =>
    createHTMLLintPlugin(html, noEmptyTag, optionsFromConfig),

  // for those rules, that doesnt need any options from config, use like this
  [noDupId.ruleName]: (html) => createHTMLLintPlugin(html, noDupId),

  [noDupTag.ruleName]: (html) => createHTMLLintPlugin(html, noDupTag),

  [noBoolTrueExplicitDefine.ruleName]: (html) =>
    createHTMLLintPlugin(html, noBoolTrueExplicitDefine),
};
