import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/no-empty-tag';

const tester = new RuleTester(rule, {});

tester.run('no-empty-tag', {
  valid: [
    {
      input: '<a>d</a>',
    },
    '<a><p>d</p></a>',
    '<img />',
    '<input type="text" />',
    {
      input: '<a></a>',
      config: { ignore: ['a'] },
    },
  ],
  inValid: [
    {
      input: '<a></a>',
      errors: [
        {
          message: 'the tag < a > has no content.',
        },
      ],
    },
    {
      input: '<a><p></p></a>',
      errors: [
        {
          message: 'the tag < p > has no content.',
        },
      ],
    },
  ],
});
