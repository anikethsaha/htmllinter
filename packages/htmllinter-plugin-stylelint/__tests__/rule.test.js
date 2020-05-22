import { RuleTester } from '@htmllinter/core';
import rule from '../src/rule';

const tester = new RuleTester(rule, {});

tester.run('stylelint', {
  valid: [`<style></style>`, '<style>a { color: #fff; }\n</style>'],
  inValid: [
    {
      input: '<style>a {color: #FFF; }</style>',
      errors: [
        {
          message:
            'Expected single space after "{" of a single-line block (block-opening-brace-space-after)',
        },
        {
          message: 'Expected "#FFF" to be "#fff" (color-hex-case)',
        },
        {
          message:
            'Unexpected missing end-of-source newline (no-missing-end-of-source-newline)',
          location: { col: 17, line: 2 },
        },
      ],
    },
  ],
});
