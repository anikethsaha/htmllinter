/* eslint-disable import/prefer-default-export */
import path from 'path';
import execa from 'execa';

const { sync: spSync } = execa;

const cliPath = require.resolve(path.resolve(__dirname, '../../../bin/htmllinter.js'));

export const run = (testCase, args = []) => {
  const cwd = path.resolve(testCase);
  const result = spSync('node', [cliPath,...args], {
    cwd: cwd,
    reject: false,
    stdio: 'pipe',
  });
  return result;
};
