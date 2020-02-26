# API

Node api to use `htmllinter`

```js
const htmllinter = require('htmllinter')
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
