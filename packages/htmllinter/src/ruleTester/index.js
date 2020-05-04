import assert from 'assert';
import run from '../htmllinter';
import createHtmllinterPlugin from '../createHtmlLinterPlugin';

const DESCRIBE = Symbol('describe');
const IT = Symbol('it');

class RuleTester {
  constructor(rule, option = {}) {
    this.option = option;
    this.rule = this._createHtmllinterPlugin(rule);
  }

  _createHtmllinterPlugin(rule) {
    // this means that this rule can take option from config
    if (Array.isArray(rule.meta.schema) && rule.meta.schema.length > 0) {
      return (optionsFromConfig = {}) => (html) =>
        createHtmllinterPlugin(html, rule, optionsFromConfig);
    }
    if (Object.keys(rule.meta.schema).length > 0) {
      return (optionsFromConfig = {}) => (html) =>
        createHtmllinterPlugin(html, rule, optionsFromConfig);
    }

    // this means that this rule cant take option from config
    return (html) => createHtmllinterPlugin(html, rule);
  }

  run(ruleName, cases) {
    const { valid, invalid } = cases;
    if (!ruleName) {
      throw new Error('Htmllinter ruleTest: ruleName cant be undefined. ');
    }

    if (!valid || valid.length === 0) {
      throw new Error(
        'Htmllinter ruleTest: please specify atleast 1 valid cases '
      );
    }

    if (!invalid || invalid.length === 0) {
      throw new Error(
        'Htmllinter ruleTest: please specify atleast 1 valid cases '
      );
    }

    describe(`Running tests for ${ruleName}`, () => {
      describe('valid', () => {
        valid.forEach(({ input, config = {} }) => {
          it(input, async () => {
            const _config = {
              plugins: [{ [ruleName]: this.rule }],
              rules: { [ruleName]: ['on', config] },
            };
            const op = await run(input, _config);

            assert.strictEqual(op.length, 0);
          });
        });
      });
    });
  }
}

export default RuleTester;
