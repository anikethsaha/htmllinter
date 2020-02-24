module.exports = {
  extend: require('./htmllint-basic-standard'),
  // two cases for rules,
  // either off or want to pass any options
  // if 'options' , then it has to be array and then
  // second arg is options
  // else if 'off', then string

  // to disable a rule, it will be 'off'
  // in the code , check for the type string and value of arr[0]
  // to be 'off'
  rules: {
    'no-empty-tag': 'on',
  },
};
