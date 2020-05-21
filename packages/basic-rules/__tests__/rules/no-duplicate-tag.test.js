import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/no-duplicate-tag';

const tester = new RuleTester(rule, {});

tester.run('no-duplicate-tag', {
  valid: ['<a id="a" >a</a>'],
  inValid: [
    {
      input: `<body> <body></body> </body>`,
      errors: [{ message: 'the tag body is used 2 times which is illegal' }],
    },
  ],
});
