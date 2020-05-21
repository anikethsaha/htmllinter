import basicRules from '@htmllinter/basic-rules';

export default {
  plugins: [basicRules],
  rules: {
    'no-empty-tag': 'on',
    'no-duplicate-id': 'on',
    'no-duplicate-tag': 'on',
    'no-bool-true-explicit-define': 'on',
    'doctype-top': ['on', { startingLineNumber: 1 }],
    'long-line-content': 'on',
    'no-missing-alt': 'on',
    'newline-multiline-comments': 'on',
    'trailing-singleline-comments': 'on',
    'newline-eof': 'on',
  },
};
