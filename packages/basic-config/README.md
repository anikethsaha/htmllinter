# `@htmllinter/basic-config`

## Installation

```shell
npm @htmllinter/core @htmllinter/basic-config
```

## Usage

In your root directory (recommmended), create a file name `htmllinter.config.js` (this filename is must and non-replaceable)

`htmllinter.config.js`

```js
module.exports = {
  extend: require('@htmllinter/basic-config'),
};
```

Add a script for linting in your `package.json`

```json

"scripts"{
  "lint:html":"htmllinter input.html"
}

```

## Run

Run the following command in your terminal

```shell
npm run lint:html

# or using yarn

yarn lint:html
```
