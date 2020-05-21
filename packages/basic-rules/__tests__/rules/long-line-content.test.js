import { RuleTester } from '@htmllinter/core';
import rule from '../../src/rules/long-line-content';

const tester = new RuleTester(rule, {});

tester.run('long-line-content', {
  valid: [
    '<a enable >some really really but not more than 80</a>',
    '<a data="" >a</a>',
    '<input disabled />',
    {
      input:
        '<a enable >some really really some really really really long text which is ofcoz more than 80</a>',
      config: { maxLen: 90 },
    },
    `<a enable  data1='' data2='data' data3='' data4='2' data1=''>some really really some really really really</a>`,
  ],
  inValid: [
    {
      input:
        '<a enable >some really really some really really really long text which is ofcoz more than 80</a>',
      errors: [
        {
          message: 'text length is 82, allowed limit is 80.',
        },
      ],
    },
    {
      input: '<a enable >some really really but not more than 80</a>',
      config: { maxLen: 30 },
      errors: [
        {
          message: 'text length is 39, allowed limit is 30.',
        },
      ],
    },
    {
      input: `<a enable  data1='' data2='data' data3='' data4='2'  data1='' data2='data' data3='' data4='2' data1=''>some really really some really really really</a>`,

      errors: [
        {
          message: 'element lenght is 103, allowed limit is 100',
        },
      ],
    },
    {
      input: `<a enable  data1='' data2='data' data3='' data4='2'  data1='' data2='data' data3='' data4='2' data1=''>some really really some really really really long text which is ofcoz more than 80</a>`,
      errors: [
        {
          message: 'element lenght is 103, allowed limit is 100',
        },
        {
          message: 'text length is 82, allowed limit is 80.',
        },
      ],
    },
  ],
});
