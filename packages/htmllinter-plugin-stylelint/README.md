# htmllinter-plugin-stylelint

htmllinter plugin to lint css inside of style tags using stylelint

## Installation

```shell
yarn add htmllinter-plugin-stylelint --dev
```

## Usage

In your `htmllinter.config.js` file, include this module in plugin property

`htmllinter.config.js`

```js
module.exports = {
  plugins: [require('htmllinter-plugin-stylelint')],
  rules: {
    stylelint: 'on',
  },
};
```

## Configuration of Stylelint rules and config

We are using [stylelint node api](https://stylelint.io/user-guide/usage/node-api#nodejs-api) which accepts some option.

[Refer here](https://stylelint.io/user-guide/usage/node-api#options) for the options

> We dont accept the [`files`](https://stylelint.io/user-guide/usage/node-api#files) as both `code` and this cant be used together

You can pass these options from `htmllinter.config.js` 's `rules` property

**`Example :`**

```js
// htmllinter.config.js

module.exports = {
  plugins: [require('htmllinter-plugin-stylelint')],
  rules: {
    stylelint: [
      'on',
      {
        config: {
          rules: {
            indentation: false,
          },
        },
      },
    ],
  },
};
```
