import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
// import resolve from '@rollup/plugin-node-resolve';

const babelConfig = require('../../babel.config');

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },

    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },

    {
      file: 'dist/index.min.js',
      format: 'cjs',
      plugin: [terser()],
    },
  ],
  plugins: [babel(babelConfig)],
};
