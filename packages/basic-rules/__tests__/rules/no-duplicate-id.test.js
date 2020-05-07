import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/no-duplicate-id';

const tester = new RuleTester(rule, {});

tester.run('no-duplicate-id', {
  valid: ['<a id="a" >a</a>'],
  inValid: [
    {
      input: '<a id="a  b" >a <p id="a b"> </p> </a>',
      errors: [{ message: "duplicate ids 'a b' for p" }],
    },
    {
      input: '<input id="a" /><a id="a" ></a>',
      errors: [{ message: "duplicate ids 'a' for a" }],
    },
  ],
});
