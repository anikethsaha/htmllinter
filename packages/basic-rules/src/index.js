/* eslint-disable no-unused-vars */
import { createHTMLLintPlugin } from '@htmllinter/core';

import noEmptyTag from './rules/no-empty-tag';
import noBoolTrueExplicitDefine from './rules/no-bool-true-explicit-define';
import noDupId from './rules/no-duplicate-id';
import noDupTag from './rules/no-duplicate-tag';
import doctypeTop from './rules/doctype-top';
import longLineContent from './rules/long-line-content';
import noMissingAlt from './rules/no-missing-alt';
import newlineMultilineComments from './rules/newline-multiline-comments';
import trailingSinglineComments from './rules/trailing-singleline-comments';

export default {
  // for rules that needs options/data from config, use like this
  [noEmptyTag.ruleName]: (optionsFromConfig = {}) => (html) =>
    createHTMLLintPlugin(html, noEmptyTag, optionsFromConfig),
  [longLineContent.ruleName]: (optionsFromConfig = {}) => (html) =>
    createHTMLLintPlugin(html, longLineContent, optionsFromConfig),
  // for those rules, that doesnt need any options from config, use like this
  [noDupId.ruleName]: (html) => createHTMLLintPlugin(html, noDupId),
  [noMissingAlt.ruleName]: (html) => createHTMLLintPlugin(html, noMissingAlt),
  [noDupTag.ruleName]: (html) => createHTMLLintPlugin(html, noDupTag),
  [doctypeTop.ruleName]: (optionsFromConfig = {}) => (html) =>
    createHTMLLintPlugin(html, doctypeTop, optionsFromConfig),
  [newlineMultilineComments.ruleName]: (html) =>
    createHTMLLintPlugin(html, newlineMultilineComments),
  [trailingSinglineComments.ruleName]: (html) =>
    createHTMLLintPlugin(html, trailingSinglineComments),
  [noBoolTrueExplicitDefine.ruleName]: (html) =>
    createHTMLLintPlugin(html, noBoolTrueExplicitDefine),
};
