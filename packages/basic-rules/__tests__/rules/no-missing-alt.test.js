import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/no-missing-alt';

const tester = new RuleTester(rule, {});

tester.run('no-missing-alt', {
  valid: [`<img alt="" />`, `<img alt="" src="" />`],
  inValid: [
    {
      input: '<img />',
      errors: [
        {
          message: 'img element should have `alt` attribute',
        },
      ],
    },
    {
      input: '<img src=""/>',
      errors: [
        {
          message: 'img element should have `alt` attribute',
        },
      ],
    },
  ],
});
