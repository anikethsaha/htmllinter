# htmllinter-webpack-plugin

A webpack plugin to lint html file emitted in output folder.
This plugin should be using with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) which creates a template html file for your bundle

## Install

Install it using

```shell
yarn add htmllinter-webpack-plugin --dev
```

> Make sure you have `html-webpack-plugin` installed

## Usage

in your `webpack.config.js`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmllinterWebpackPlugin = require('htmllinter-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmllinterWebpackPlugin(options),
  ],
};

```

## Options

### `config`

It is config object for `htmllinter`. [Refer this](https://github.com/anikethsaha/htmllinter#config-file)

**Example**

```js
// webpack.config.js

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmllinterWebpackPlugin({
      config:{
        extend: require('@htmllinter/basic-config'),
        rules: {
          ...
        }
      }
    }),
  ],
};
```
