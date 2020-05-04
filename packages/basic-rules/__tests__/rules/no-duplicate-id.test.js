import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/no-duplicate-id';

const tester = new RuleTester(rule, {});

tester.run('no-duplicate-id', {
  valid: ['<a id="a" >a</a>'],
  inValid: [
    {
      input: '<input id="a" /><a id="a" ></a>',
      errors: [{ message: 'duplicate ids a @ a' }],
    },
  ],
});
