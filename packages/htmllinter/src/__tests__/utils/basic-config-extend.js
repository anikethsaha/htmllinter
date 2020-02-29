const basicRules = require('../../../../basic-rules');

module.exports = {
  plugins: [basicRules],
  rules: {
    'no-empty-tag': 'on',
    'no-duplicate-id': 'on',
    'no-bool-true-explicit-define': 'on',
  },
};
