import { run } from '../index';

/**
 * This fixture has three errors
 * 1. duplicate ids
 * 2. enable=true
 * 3. empty tag
 */
const html = `<!DOCTYPE html>
      <html>
        <body>
          <h1>My First Heading</h1>
          <h1 id="asd adsasd">My first paragraph.</h1>
          <a id="asd adsasd">ads</a>
          <a enable="true">aaa</a>
          <h3></h3>
        </body>
      </html>
      `;

describe('running the htmllinter.run api using no config', () => {
  it('should return no error config rules even though html has linting issues', async () => {
    const result = await run(html, {});
    expect(typeof result).toBe('object');
    expect(result.length).toBe(0);
  });
});
describe('running the htmllinter.run api with config', () => {
  describe('extend', () => {
    it('should return linting data', async () => {
      const config = {
        extend: require('../../../basic-config'),
      };
      const result = await run(html, config);
      expect(typeof result).toBe('object');
      expect(result.length).toBe(3);
      let ruleNames = [];
      result.map((res) => {
        ruleNames.push(res.ruleName);
      });
      expect(ruleNames.sort()).toEqual(
        Object.keys(config.extend.plugins[0]).sort()
      );
    });
    it('should return linting data with rules disable', async () => {
      const config = {
        extend: require('../../../basic-config'),
        rules: {
          'no-duplicate-id': 'off',
        },
      };
      const result = await run(html, config);
      expect(typeof result).toBe('object');
      expect(result.length).toBe(2);
      let ruleNames = [];
      result.map((res) => {
        ruleNames.push(res.ruleName);
      });
      expect(ruleNames.sort()).toEqual(
        ['no-bool-true-explicit-define', 'no-empty-tag'].sort()
      );
    });
    it('should return linting data [] (empty) with all rules disable', async () => {
      const config = {
        extend: require('../../../basic-config'),
        rules: {
          'no-duplicate-id': 'off',
          'no-bool-true-explicit-define': 'off',
          'no-empty-tag': 'off',
        },
      };
      const result = await run(html, config);
      expect(typeof result).toBe('object');
      expect(result.length).toBe(0);
    });
  });
  describe('plugins', () => {
    it('should not return any linting error even though the input has it cause no rules is passed for the plugin', async () => {
      const config = {
        plugins: [require('./utils/examplePlugin')],
      };
      const result = await run(html, config);
      expect(typeof result).toBe('object');
      expect(result.length).toBe(0);
    });
    it('should return linting errors [no-bool-true-explicit-define]', async () => {
      const input = `<a enable="true"></a>`;
      const config = {
        plugins: [require('./utils/examplePlugin')],
        rules: {
          'no-bool-true-explicit-define': 'on',
        },
      };
      const result = await run(input, config);
      expect(typeof result).toBe('object');
      expect(result.length).toBe(1);
      let ruleNames = [];
      result.map((res) => {
        ruleNames.push(res.ruleName);
      });
      expect(ruleNames.sort()).toEqual(['no-bool-true-explicit-define']);
    });
  });
});
