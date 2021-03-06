import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/no-bool-true-explicit-define';

const tester = new RuleTester(rule, {});

tester.run('no-bool-true-explicit-define', {
  valid: [
    '<a enable >a</a>',
    '<a data-true >a</a>',
    { input: '<input disabled />' },
  ],
  inValid: [
    {
      input: '<input disabled=true />',
      errors: [
        {
          message:
            'the attribute "disabled" boolean value "true", use "<input disabled>" instead',
        },
      ],
    },
  ],
});
