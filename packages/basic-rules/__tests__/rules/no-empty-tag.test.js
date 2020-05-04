import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/no-empty-tag';

const tester = new RuleTester(rule, {});

tester.run('no-empty-tag', {
  valid: [
    {
      input: '<a>d</a>',
    },
  ],
  invalid: [
    {
      input: '<a></a>',
    },
  ],
});
