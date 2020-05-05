# API

Node api to use `htmllinter`

```js
const htmllinter = require('htmllinter');
```

## `htmllinter.run(html = '', config = {})`

Parameters :

- `html`:
  Type: `String`
  Default: `' '`
  description : this is the html code as string which needs to be linted
- `config`:
  Type: `Object`
  Default : `{ }`
  description : this is the html code as string which needs to be linted

Returns : `lintingData`

`lintingData` :

- Type: `Array<Object>`
- It is an array of object
- Object having {msg, ruleName}
- `msg`: the plugin message orignated from `reporter` array passed to the plugin
- `ruleName`: the rule name

## `htmllinter.createHTMLLintPlugin(tree, rule : { ruleName, rule })`

Parameters :

- `tree`:
  Type: `Object | Array`
  Default: `none`
  description : AST generated from `posthtml`
- `rule`:
  Type: `Object`
  Default : `{ }`
  description : this object has two properties , `rule` and `ruleName`

Returns: a `htmllinter` campatible plugin

## `const ruleTester = htmllinter.RuleTester(rule, options)`

Parameters :

- `rule`:
  Type: `Function`
  Default: `none`
  description : The rule definition which needs to be tested
- `options`:
  Type: `Object`
  Default : `{ }`
  description : **`WIP`**

### `ruleTester.run(ruleName, testcases)`

Parameters :

- `ruleName`:
  Type: `String`
  Default: `null`
  description : The name of the rule. Has be to perfectly matched with the one mentioned in rule's object
- `testcases`:
  Type: `Object<valid, invalid>`
  Default : `{ }`
  Required: `true`
  description : this object contains two property .
  - `valid`
    - Type : `String | Object<input, config?>`
    - Description : if it is string , then it contains the input html which needs to be tested.
      If it is object, it should have `input` property which is the input html code. And the config is the rule's config/option
  - `inValid`
    - Type : `Object<input, errors, config?>`
    - Description : It is an object, it should have `input` property which is the input html code also, it should have `errors` property which is array of object `Array<Object<message>>` having `message` as property in each element. And the config is the rule's config/option
