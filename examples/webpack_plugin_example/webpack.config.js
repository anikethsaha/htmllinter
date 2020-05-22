const path = require('path');
const HtmllinterWebpackPlugin = require('../../packages/htmllinter-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html',
    }),
    new HtmllinterWebpackPlugin({
      config: {
        extend: require('../../packages/basic-config'),
      },
    }),
  ],
};
