import { resolve } from 'path';
import execa from 'execa';

const { sync: spSync } = execa;
const cliPath = resolve(__dirname, '../../bin/htmllinter.js');

describe('Testing CLI behavior', () => {
  describe('input pattern', () => {
    it('should show help when no arg is passed with proper err message', () => {
      const result = spSync(cliPath);
      expect(result.exitCode).toBe(0);
      expect(result.stderr).toBe(
        '[HTMLLINTER]: no argument passed. Please provide the input file(s) atleast'
      );
      expect(result.stdout).toMatchSnapshot('help');
    });

    it('should show help when when non-existing input is passed with proper err message', () => {
      const inputFileName = 'nonExist.html';
      const result = spSync(cliPath, [inputFileName]);
      expect(result.stderr).toBe(
        `[HTMLLINTER]: no file found with input pattern : ${inputFileName}`
      );
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatchSnapshot('help');
    });

    it('should show message when wrong pattern is pass', () => {
      const pattern = 'dir,dir2';
      const result = spSync(cliPath, [pattern]);
      expect(result.stderr).toBe(
        `[HTMLLINTER]: no file found with input pattern : ${pattern}`
      );
      expect(result.exitCode).toBe(0);
    });
  });

  describe('Config flag', () => {
    it('should show message when correct path to config is passed but not present', () => {
      const configFilePath = './packages';
      const pattern =
        './packages/htmllinter/src/__tests__/fixtures/extendConfig/*.html';
      const result = spSync(cliPath, [pattern, '--config', configFilePath], {
        reject: false,
      });

      const errArr = result.stderr.split(' ');
      expect(errArr).toContain('Cannot');
      expect(errArr).toContain('find');
      expect(errArr).toContain('module');
      expect(result.stdout).toBe('');
      expect(result.exitCode).toBe(1);
    });

    it('should show message when htmllinter.config.js is passed along with the path even if correct', () => {
      const configFilePath =
        './packages/htmllinter/src/__tests__/fixtures/extendConfig/htmllinter.config.js';
      const pattern =
        './packages/htmllinter/src/__tests__/fixtures/extendConfig/*.html';
      const result = spSync(cliPath, [pattern, '--config', configFilePath], {
        reject: false,
      });

      const errArr = result.stderr.split(' ');
      expect(errArr).toContain('Cannot');
      expect(errArr).toContain('find');
      expect(errArr).toContain('module');
      expect(result.stdout).toBe('');
      expect(result.exitCode).toBe(1);
    });
  });

  describe('default config : fixture : defaultConfig', () => {
    it('should show the linting errors  (no htmllinter.config.js present) ', () => {
      const pattern =
        './packages/htmllinter/src/__tests__/fixtures/defaultConfig/input.html';
      const result = spSync(cliPath, [pattern], {
        reject: false,
        stdio: 'pipe',
      });
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toMatchSnapshot('default config');
    });

    it('should not show the linting errors  (no htmllinter.config.js present)  : no-error', () => {
      const pattern =
        './packages/htmllinter/src/__tests__/fixtures/defaultConfig/noErr.html';
      const result = spSync(cliPath, [pattern], {
        reject: false,
        stdio: 'pipe',
      });

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatchSnapshot('default config no error');
    });
  });

  describe('extend config : fixture : extendConfig', () => {
    it('should show the linting errors  ( htmllinter.config.js present) ', () => {
      const configFilePath =
        './packages/htmllinter/src/__tests__/fixtures/extendConfig';
      const pattern =
        './packages/htmllinter/src/__tests__/fixtures/extendConfig/input.html';
      const result = spSync(cliPath, [pattern, '-c', configFilePath], {
        reject: false,
        stdio: 'pipe',
      });

      expect(result.exitCode).toBe(1);
      expect(result.stdout).toMatchSnapshot('extend config');
    });

    it('should not show the linting errors  ( htmllinter.config.js present) as non-Error files ', () => {
      const configFilePath =
        './packages/htmllinter/src/__tests__/fixtures/extendConfig';
      const pattern =
        './packages/htmllinter/src/__tests__/fixtures/extendConfig/noError.html';
      const result = spSync(cliPath, [pattern, '-c', configFilePath], {
        reject: false,
        stdio: 'pipe',
      });

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatchSnapshot('extend config');
    });
  });

  describe('extend config with rule off : fixture : extendConfigRuleOff', () => {
    it('should show the linting errors  ( htmllinter.config.js present) ', () => {
      const configFilePath =
        './packages/htmllinter/src/__tests__/fixtures/extendConfigRuleOff';
      const pattern =
        './packages/htmllinter/src/__tests__/fixtures/extendConfigRuleOff/input.html';
      const result = spSync(cliPath, [pattern, '-c', configFilePath], {
        reject: false,
        stdio: 'pipe',
      });

      expect(result.exitCode).toBe(1);
      expect(result.stdout).toMatchSnapshot('extend config rule off');
    });

    it('should not show the linting errors  ( htmllinter.config.js present) as non-Error files ', () => {
      const configFilePath =
        './packages/htmllinter/src/__tests__/fixtures/extendConfigRuleOff';
      const pattern =
        './packages/htmllinter/src/__tests__/fixtures/extendConfigRuleOff/noError.html';
      const result = spSync(cliPath, [pattern, '-c', configFilePath], {
        reject: false,
        stdio: 'pipe',
      });
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatchSnapshot('extend config rule off');
    });
  });
});
