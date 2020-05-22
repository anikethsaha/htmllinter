import { RuleTester } from '@htmllinter/core';
import rule from '../src/rule';

const tester = new RuleTester(rule, {});

tester.run('eslint', {
  valid: [
    `<script></script>`,
    {
      input: `<script>
const name = () => {

    return "hellow";

};

name();

</script>`,
      config: {
        eslintOptions: {
          overrideConfig: {
            parserOptions: { ecmaVersion: 6 },
            rules: {
              'prettier/prettier': 0,
            },
          },
          cwd: __dirname,
        },
      },
    },
  ],
  inValid: [
    {
      input: '<script> var a = "asd";</script>',
      errors: [
        {
          message: 'Replace `·var·a·=·"asd";` with `var·a·=·\'asd\';⏎`',
          location: { col: 1, line: 2 },
        },
        {
          message: 'Unexpected var, use let or const instead.',
          location: { col: 2, line: 2 },
        },
        {
          message: "'a' is assigned a value but never used.",
          location: { col: 6, line: 2 },
        },
      ],
    },
  ],
});
