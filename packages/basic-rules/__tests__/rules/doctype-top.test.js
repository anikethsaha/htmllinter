import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/doctype-top';

const tester = new RuleTester(rule, {});

tester.run('doctype-top', {
  valid: [
    `<!DOCTYPE html>`,
    '<!DOCTYPE html><a data-true >a</a>',
    {
      input: '<input disabled />\n<!DOCTYPE html>',
      config: { startingLineNumber: 2 },
    },
  ],
  inValid: [
    {
      input: '\n<input disabled />\n<!DOCTYPE html>',
      errors: [
        {
          message: 'doctype should be at line no. 2 but found at 3',
        },
      ],
      config: { startingLineNumber: 2 },
    },
    {
      input: '<input disabled=true />\n<!DOCTYPE html>',
      errors: [
        {
          message: 'doctype should be at line no. 1 but found at 2',
        },
      ],
    },
  ],
});
