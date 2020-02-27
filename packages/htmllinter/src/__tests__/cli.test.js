import { resolve } from 'path';
import { run } from './utils/cliRunner';

describe('Testing CLI behavior', () => {
  describe('input pattern', () => {
    it('should show help when no arg is passed with proper err message', () => {
      const result = run(__dirname);
      expect(result.exitCode).toBe(0);
      expect(result.stderr).toMatchSnapshot(
        `[HTMLLINTER]: no argument passed. Please provide the input file(s) atleast`
      );

      expect(result.stdout).toMatchSnapshot('help');
    });

    it('should show help when when non-existing input is passed with proper err message', () => {
      const inputFileName = 'nonExist.html';
      const result = run(__dirname, [inputFileName]);
      expect(result.stderr).toMatchSnapshot(
        `[HTMLLINTER]: no file found with input pattern : ${inputFileName}`
      );
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatchSnapshot('help');
    });

    it('should show message when wrong pattern is pass', () => {
      const pattern = 'dir,dir2';
      const result = run(__dirname, [pattern]);
      expect(result.stderr).toMatchSnapshot(
        `[HTMLLINTER]: no file found with input pattern : ${pattern}`
      );
      expect(result.exitCode).toBe(0);
    });
  });

  describe('Config flag', () => {
    it('should show message when correct path to config is passed but not present', () => {
      const configFilePath = './utils';
      const pattern = './fixtures/standardConfig/*.html';
      const result = run(__dirname, [pattern, '--config', configFilePath]);
      const errArr = result.stderr.split(' ');
      expect(errArr).toContain('Cannot');
      expect(errArr).toContain('find');
      expect(errArr).toContain('module');
      expect(result.stdout).toMatchSnapshot(
        'Output for loading default config { }'
      );
      expect(result.exitCode).toBe(0);
    });

    it('should show message when htmllinter.config.js is passed along with the path even if correct', () => {
      const configFilePath = './htmllinter.config.js';
      const pattern = '*.html';
      const result = run(resolve(__dirname, './fixtures/standardConfig'), [
        pattern,
        '--config',
        configFilePath,
      ]);

      const errArr = result.stderr.split(' ');
      expect(errArr).toContain('Cannot');
      expect(errArr).toContain('find');
      expect(errArr).toContain('module');
      expect(result.stdout).toMatchSnapshot(
        'Output for loading default config { }'
      );
      expect(result.exitCode).toBe(0);
    });
  });

  describe('default config : fixture : defaultConfig', () => {
    it('should not throw error, load default config (htmllinter.config.js is present) when no config arg is passed', () => {
      const pattern = 'input.html';
      const result = run(resolve(__dirname, './fixtures/defaultConfig'), [
        pattern,
      ]);

      expect(result.exitCode).toBe(1);
      expect(result.stdout).toMatchSnapshot('default config');
    });

    it('should not throw error, load default config (htmllinter.config.js is present) when no config arg is passed   : no-error', () => {
      const pattern = './fixtures/defaultConfig/noErr.html';
      const result = run(resolve(__dirname, './fixtures/defaultConfig'), [
        pattern,
      ]);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatchSnapshot('default config no error');
    });
  });

  describe('no config file : fixture : noConfig', () => {
    it('should load default config when neither config arg is passed nor htmllinter.config.js is present', () => {
      const pattern = 'input.html';
      const result = run(resolve(__dirname, './fixtures/noConfig'), [pattern]);
      const errArr = result.stderr.split(' ');
      expect(errArr).toContain('Cannot');
      expect(errArr).toContain('find');
      expect(errArr).toContain('module');
      expect(result.stdout).toMatchSnapshot(
        'Output for loading default config { }'
      );
      expect(result.exitCode).toBe(0);
    });
  });

  describe('standard config : fixture : standardConfig', () => {
    it('should show the linting errors  ( htmllinter.config.js present) ', () => {
      const configFilePath = '/';
      const pattern = 'input.html';
      const result = run(resolve(__dirname, './fixtures/standardConfig'), [
        pattern,
        '-c',
        configFilePath,
      ]);

      expect(result.exitCode).toBe(1);
      expect(result.stdout).toMatchSnapshot('standard config');
    });

    it('should not show the linting errors  ( htmllinter.config.js present) as non-Error files ', () => {
      const configFilePath = './';
      const pattern = 'noError.html';
      const result = run(resolve(__dirname, './fixtures/standardConfig'), [
        pattern,
        '-c',
        configFilePath,
      ]);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatchSnapshot('standard config');
    });
  });

  describe('standard config with rule off : fixture : standardConfigRuleOff', () => {
    it('should show the linting errors  ( htmllinter.config.js present) ', () => {
      const configFilePath = './fixtures/standardConfigRuleOff';
      const pattern = './fixtures/standardConfigRuleOff/input.html';
      const result = run(__dirname, [pattern, '-c', configFilePath]);
      expect(result.exitCode).toBe(1);
      expect(result.stdout).toMatchSnapshot('standard config rule off');
    });

    it('should not show the linting errors  ( htmllinter.config.js present) as non-Error files ', () => {
      const configFilePath = './';
      const pattern = 'noError.html';
      const result = run(
        resolve(__dirname, './fixtures/standardConfigRuleOff'),
        [pattern, '-c', configFilePath]
      );
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatchSnapshot('standard config rule off');
    });
  });
});
