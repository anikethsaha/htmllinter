import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/newline-multiline-comments';

const tester = new RuleTester(rule, {});

tester.run('newline-multiline-comments', {
  valid: [`<!-- hey look single line -->`],
  inValid: [
    {
      input: '<!-- \n hellow -->',
      errors: [
        {
          message: 'multiline comments should start with a new line',
        },
      ],
    },
    {
      input: '<!--\t\n hellow -->',
      errors: [
        {
          message: 'multiline comments should start with a new line',
        },
      ],
    },
    {
      input: '<!--\r hello -->',
      errors: [
        {
          message: 'multiline comments should start with a new line',
        },
      ],
    },
  ],
});
