# htmllinter-plugin-eslint

htmllinter plugin to lint css inside of script tags using eslint

## Installation

```shell
yarn add htmllinter-plugin-eslint --dev
```

## Usage

In your `htmllinter.config.js` file, include this module in plugin property

`htmllinter.config.js`

```js
module.exports = {
  plugins: [require('htmllinter-plugin-eslint')],
  rules: {
    eslint: 'on',
  },
};
```

## Configuration of eslint rules and config

We are using [Eslint's Node API](https://eslint.org/docs/developer-guide/nodejs-api) for running the eslint linter

[Refer this](https://eslint.org/docs/developer-guide/nodejs-api#parameters) for `options` this rule accepts

You can pass these options from `htmllinter.config.js` 's `rules` property

**`Example :`**

```js
// htmllinter.config.js

module.exports = {
  plugins: [require('htmllinter-plugin-eslint')],
  rules: {
    eslint: [
      'on',
      {
        eslintOptions: {
          ...
        },
      },
    ],
  },
};
```
