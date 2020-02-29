<p align="center">
  
<h1 align="center"> htmllinter </h1>

<p align="center"> html linter based on posthtml. shareable and plug-able linter made on top of posthtml </p>

</p>

<p align="center">

<img alt="efba logo" src="https://imgur.com/9pWjH5N.png" width="350px" />

</p>

## Table of Contents

- [Installation](#installation)
  - [About the packages](#about-the-packages)
- [Usage](#usage)
- [CLI](#cli)
  - [Usage](#usage-1)
- [Node API](#node-api)
- [Config File](#config-file)
  - [1. `standard`](#1-config)
  - [2. `plugins`](#2-plugins)
  - [2. `rules`](#2-rules)
- [Rules](#rules)
- [Creating your own `rules` or `plugins`](#creating-your-own-rules-or-plugins)
- [Creating your own shareable `config`](#creating-your-own-shareable-config)
- [Contributing](#contributing)
- [Note](#note)
- [Inspiration/Thanks](#inspirationthanks)

## Installation

```shell
npm install @htmllinter/core @htmllinter/basic-config --save-dev
```

#### About the packages

- `@htmllinter/core` is the linter which comes with its own CLI to run with. It supports pretty error display in table format. It has node API which can be use to
  linter node programs.

- `@htmllinter/basic-config`: it is the shareable config package which uses `@htmllinter/basic-rules` package to load rules and share it. Read more about it [**HERE**](https://github.com/anikethsaha/htmllinter/blob/config-feat/packages/basic-config/README.md)

- `@htmllinter/basic-rules` : it is the rules package contains some basic rules. **You dont need to install it explicitly as it comes with `@htmllinter/basic-config`**

## Usage

`htmllinter` can be configured through a config file name `htmllinter.config.js` . Create this file in your project and follow [this guide](#config-file) to configure this file.

Add `@htmllinter/basic-config` in your `htmllinter.config.js` in `extend` property

`htmllinter.config.js`

```js

module.exports : {
  extend : require('@htmllinter/basic-config')
}

```

And now you are ready to lint your html files using the following commands

```shell
htmllinter input.html
```

in this command, if your `htmllinter.config.js` file is present at the directory from where this command is being run, then it will load that config file
and run the linter and check the `input.html` file. **If you dont have any `htmllinter.config.js` file preset at the root, it will load the linter with default config which is `{}`, an empty object.**

The input accepts a `glob` pattern, so it can be patterns like `**/*.html`, `*.html` etc.
You can find more about these patterns [**here**](https://github.com/isaacs/node-glob#glob-primer)

You can use the `--config` or `-c` flag in order to specify the path to your `htmllinter.config.js` file. like this

```shell
htmllinter input.html -c ./path/to/config/folder
```

> Note that the path passed the `-c` or `--config` must be to a directory instead of pointing to the config file.

> Also, it should be relative from the directory where `htmllinter` is being run

**Check the [CLI](#cli) Guide to know more about how to use the CLI and the option it takes**

## CLI

The CLI is one of the to run the `htmllinter`. It comes by default with `htmllitner` package so you dont need to install it seperately.

### Usage

```

Usage :

htmllinter <input> [Options]

input           - it is the input(html) file name, it accepts glob pattern.
                example :
                  - "input.html"
                  - "input"
                  - "/*.html"
                  - "."

Options
  -c, --config    - path to htmllinter.config.js.
                    default is "."
                    example :
                    - '.'
                    - './dir/'

Example

    htmllinter input.html
    htmllinter input -c ../
    htmllinter **/*

```

## Node API

**[REFER THIS](https://github.com/anikethsaha/htmllinter/blob/master/docs/api.md)**

## Config File

`htmllinter` can be configured through config file name `htmllinter.config.js`.

> Note, the file name has to be `htmllinter.config.js`

There are three properties this config file exports

### 1. `extend`

Type : `Object (modules)`
Default : `none`

This option extends the config which is passed here. A shareable config package is like an usual `htmllinter.config.js`. They exports properties like `plugins` , `rules` and they can even extend other config in `extend` property

`htmllinter.config.js`

```js
module.exports = {
  extend: require('@htmllinter/basic-config'),
};
```

**Learn more about creating your own [`shareable config rule packages here`]()**

### 2. `plugins`

Type : `Array<Objects>`
Default : `[]`

This accepts the array of plugins packages. This plugins are just packages exporting the rule defination and rule name. This rules are not turned on
by default, you need to turn them on in the [`rules`](#rules) property of the config file.

EXAMPLE

`htmllinter.config.js`

```js
module.exports = {
  plugins: [require('no-bool-true-explicit-define')],
};
```

And then you need to manually turn the rule on that is coming from the plugin ,(`no-bool-true-explicit-define` for this example)

```js
module.exports = {
  plugins: [require('no-bool-true-explicit-define')],
  rules: {
    'no-bool-true-explicit-define': 'on',
  },
};
```

**Learn more about creating a plugins [`here`](https://github.com/anikethsaha/htmllinter/blob/master/docs/how-to-create-plugin.md)**

**learn more about rules [`here`](#rules)**

### 2. `rules`

Type : `Objects`
Default : `{}`

This is the list of the rules and there actionable value like whether they are turned `on` or `off`

```js
module.exports = {
  plugins: [require('no-bool-true-explicit-define')],
  rules: {
    'no-bool-true-explicit-define': 'on',
    'no-empty-tag': 'off',
  },
};
```
[**CLICK HERE to know more about sharing data from config to rule's options**](https://github.com/anikethsaha/htmllinter/blob/master/docs/pass-data-from-config-to-rule.md)

## Rules

`@htmllinter/core` doesnt comes with any rules, it is recommended to use `@htmllinter/basic-standard` along with it in order to get the rules.

List of rules comes with [`@htmllinter/basic-rules`]()

- `no-empty-tag` : Read [**here**] for more info about this
- `no-duplicate-id` : Read [**here**] for more info about this
- `no-bool-true-explicit-define` : Read [**here**] for more info about this

## Creating your own `rules` or `plugins`

`plugins`/`rules` are nothing but a module which is exporting two things

- `ruleName` : `string`, as name suggests, it is the name of the rule

- `rule` : `function`, it is a function which takes three parameters (`options, reporter, repoterNode`) and returns a function which gets two parameters (`tree`,`result`)

**[CLICK HERE to read in details how to create a rule](https://github.com/anikethsaha/htmllinter/blob/master/docs/how-to-create-rule.md)**

## Creating your own shareable `config`

A shareable `config` is nothing by a module exporting a `htmllinter` config properties which consist of `plugins`, `rules` and `extend` (which in turn exports a config)

**[CLICK HERE to read in details how to create a shareable `config`](https://github.com/anikethsaha/htmllinter/blob/master/docs/how-to-shareable-config.md)**

## Contributing

Feel free to submit PR with new features, bug fixes, docs update and other changes you think needs to be done.
Also, submit an issue if you think needs to be corrected or implemented or needs a discussion

## Note

This is still an early stage linter with not so advance rules. Please contribute so that we can get it stable and ready for `v1`.

## Inspiration/Thanks

- A huge inspiration of this is `stylelint`.
- `posthtml` : as it is made on top of `posthtml` and it use the behavior of `posthtml`'s plugins
