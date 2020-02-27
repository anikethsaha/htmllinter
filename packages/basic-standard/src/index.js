import { createHTMLLintPlugin } from '@htmllinter/core';

import noEmptyTag from './rules/no-empty-tag';
import noBoolTrueExplicitDefine from './rules/no-bool-true-explicit-define';
import noDupId from './rules/no-duplicate-id';

export const plugins = {
  [noEmptyTag.ruleName]: (html) => createHTMLLintPlugin(html, noEmptyTag),
  [noDupId.ruleName]: (html) => createHTMLLintPlugin(html, noDupId),
  [noBoolTrueExplicitDefine.ruleName]: (html) =>
    createHTMLLintPlugin(html, noBoolTrueExplicitDefine),
};

export const rules = {
  'no-empty-tag': 'on',
  'no-duplicate-id': 'on',
  'no-bool-true-explicit-define': 'on',
};
