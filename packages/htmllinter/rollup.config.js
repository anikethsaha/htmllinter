import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
// import resolve from '@rollup/plugin-node-resolve';

const babelConfig = require('../../babel.config');

module.exports = [
  {
    input: 'src/cli/index.js',
    output: [
      {
        banner: '#!/usr/bin/env node',
        file: 'bin/htmllinter.js',
        format: 'cjs',
      },

      {
        banner: '#!/usr/bin/env node',
        file: 'bin/htmllinter.esm.js',
        format: 'esm',
      },

      {
        banner: '#!/usr/bin/env node',
        file: 'bin/htmllinter.min.js',
        format: 'cjs',
        plugin: [terser()],
      },
    ],
    plugins: [babel(babelConfig)],
  },
  {
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
  },
];
