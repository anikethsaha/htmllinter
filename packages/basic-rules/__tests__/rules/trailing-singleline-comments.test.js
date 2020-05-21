import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/trailing-singleline-comments';

const tester = new RuleTester(rule, {});

tester.run('trailing-singleline-comments', {
  valid: [`<!-- hey look single line -->`],
  inValid: [
    {
      input: '<!-- \n hellow -->',
      errors: [
        {
          message: 'single line comments should start with same line as "<!--"',
        },
      ],
    },
    {
      input: '<!--\t\n hellow -->',
      errors: [
        {
          message: 'single line comments should start with same line as "<!--"',
        },
      ],
    },
    {
      input: '<!--\r hello -->',
      errors: [
        {
          message: 'single line comments should start with same line as "<!--"',
        },
      ],
    },
  ],
});
