import { RuleTester } from '@htmllinter/core';
import rule from '../src/rule';

const tester = new RuleTester(rule, {});

tester.run('stylelint', {
  valid: [`<style></style>`, '<style>a { color: #fff; }</style>'],
  inValid: [
    {
      input: '<style>a {color: #FFF; }</style>',
      errors: [
        {
          message: 'doctype should be at line no. 2 but found at 3',
        },
      ],
    },
  ],
});
