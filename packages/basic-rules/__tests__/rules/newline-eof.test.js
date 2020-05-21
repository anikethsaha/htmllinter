import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/newline-eof';

const tester = new RuleTester(rule, {});

tester.run('newline-eof', {
  valid: [
    `<html>\n`,
    '<html><a data-true >a</a>\n',
    {
      input: '<input disabled />\n<html>\n\n',
      config: { numberOfLines: 2 },
    },
  ],
  inValid: [
    {
      input: '\n<input disabled />\n<html>',
      errors: [
        {
          message: 'end of file should have 1 empty lines',
        },
      ],
    },
    {
      input: '<input disabled />\n<html>\n\n',
      errors: [
        {
          message: 'end of file should have 4 empty lines',
        },
      ],
      config: { numberOfLines: 4 },
    },
    {
      input: '<body></body>\r',
      errors: [
        {
          message: 'end of file should have 1 empty lines',
        },
      ],
    },
  ],
});
