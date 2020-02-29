/* eslint-disable no-unused-vars */
import { createHTMLLintPlugin } from '@htmllinter/core';

import noEmptyTag from './rules/no-empty-tag';
import noBoolTrueExplicitDefine from './rules/no-bool-true-explicit-define';
import noDupId from './rules/no-duplicate-id';

export default {
  [noEmptyTag.ruleName]: (optionsFromConfig = {}) => (html) =>
    createHTMLLintPlugin(html, noEmptyTag, optionsFromConfig),

  [noDupId.ruleName]: (html) => createHTMLLintPlugin(html, noDupId),

  [noBoolTrueExplicitDefine.ruleName]: (html) =>
    createHTMLLintPlugin(html, noBoolTrueExplicitDefine),
};
