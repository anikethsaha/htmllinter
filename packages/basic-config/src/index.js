import basicRules from '@htmllinter/basic-rules';

export default {
  plugins: [basicRules],
  rules: {
    'no-empty-tag': 'on',
    'no-duplicate-id': 'on',
    'no-bool-true-explicit-define': 'on',
  },
};
