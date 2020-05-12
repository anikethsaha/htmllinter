import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/newline-multiline-comments';

const tester = new RuleTester(rule, {});

tester.run('newline-multiline-comments', {
  valid: [
    `<!--
    hellow
    wrold
    -->
    `,
  ],
  inValid: [
    {
      input: '<!-- world \n hellow -->',
      errors: [
        {
          message: 'multiline comments should start with a new line',
        },
      ],
    },
    {
      input: `<!--\thellow
       world -->`,
      errors: [
        {
          message: 'multiline comments should start with a new line',
        },
      ],
    },
  ],
});
