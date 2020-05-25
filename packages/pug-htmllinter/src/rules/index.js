import { createHTMLLintPlugin } from '@htmllinter/core';

import doctypeTop from './doctype-top';

export default {
  [doctypeTop.ruleName]: (options) => (html) => {
    return createHTMLLintPlugin(html, doctypeTop, options);
  },
};
