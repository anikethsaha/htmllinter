# @htmllinter/basic-rules

this package contains rules for `htmllinter`
Comes by default with `@htmllinter/basic-config`

## Direct use as plugin

### Installation

```shell
npm install @htmllinter/core @htmllinter/basic-rules --save-dev
```

### Usage

in your `htmllinter.config.js` file

```js
module.exports = {
  plugins: [require('@htmllinter/basic-rules')],
};
```

## Usage with `@htmllinter/basic-config`

### Config Installation

```shell
npm install @htmllinter/core @htmllinter/basic-config --save-dev
```

### Config Usage

in your `htmllinter.config.js` file

```js
module.exports = {
  extend: [require('@htmllinter/basic-config')],
};
```

## Rules

### 1. `no-empty-tag`

This rule throws error when there is an empty html tag used.

`example`

```html
<a href="">click here</a>
<p></p>
```

Here, the `p` tag is empty. It will throw error like this.

```
┌────────────────────────────────┬──────────────┐
│ Message                        │ Rule Name    │
├────────────────────────────────┼──────────────┤
│ the tag < p >  has no content. │ no-empty-tag │
└────────────────────────────────┴──────────────┘
```

### 2. `no-duplicate-id`

This rule throws error when there are more than one id of same value being declared.

`example`

```html
<a id="sameID">adMy First Headings</a>
<h3 id="sameID">My First Heading</h3>
```

here, the `sameID` in `h3` is mark as duplicate

```
┌───────────────────────────┬─────────────────┐
│ Message                   │ Rule Name       │
├───────────────────────────┼─────────────────┤
│ duplicate ids sameID @ h3 │ no-duplicate-id │
└───────────────────────────┴─────────────────┘
```

### 3. `no-bool-true-explicit-define`

This rule will throw error when attributes as valued as `true` like this `<a enable=true></a>

`example`

```html
<h3 enable="true">My First Heading</h3>
```

output

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┬──────────────────────────────┐
│ Message                                                                                                 │ Rule Name                    │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┤
│ the attribute "enable" seems to be boolean with value "true",please conside using "<h3 enable>...</h3>" │ no-bool-true-explicit-define │
│                                                                                                         │                              │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┴──────────────────────────────┘
```

## Development status

**More rules will be added soon.**

Please contribute with correcting the existing rules or by adding a new rule

## Steps to add new rule in `@htmllinter/basic-standard`

Please create an issue with Title

`[New Rule][Basic]: <Rule-Name>`

We will discuss about the possibility in that issue and you can be the champion of implement it :tada:
