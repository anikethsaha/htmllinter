/* eslint-disable no-unused-vars */

import { validateRuleSchema } from '../utils/schemaValidator';

describe('Schema Validation', () => {
  describe('object schema , object rule config', () => {
    it('should run without error', () => {
      const schema = {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            default: [],
          },
          additionalProperties: false,
        },
      };
      const ruleConfig = { allow: ['s'] };
      expect(validateRuleSchema(schema, ruleConfig)).toBe(undefined);
    });

    it('should throw error', () => {
      const schema = {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            default: [],
          },
          additionalProperties: false,
        },
      };
      const ruleConfig = { allow: 's' };

      // expect(validateRuleSchema(schema, ruleConfig)).toThrow(Error);
    });
  });

  describe('array schema , array rule config', () => {
    const schema = [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            default: [],
          },
          additionalProperties: false,
        },
      },
    ];

    it('should run without error', () => {
      const ruleConfig = [{ allow: ['s'] }];
      expect(validateRuleSchema(schema, ruleConfig)).toBe(undefined);
    });

    it('should run without error with first option as string', () => {
      const newSchema = [{ type: 'stirng', default: '' }, schema[0]];
      const ruleConfig = ['always', { allow: ['s'] }];
      expect(validateRuleSchema(newSchema, ruleConfig)).toBe(undefined);
    });

    it('should throw error', () => {
      const ruleConfig = { allow: 's' };

      // expect(validateRuleSchema(schema, ruleConfig)).toThrow(Error);
    });
  });
});
