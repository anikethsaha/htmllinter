# How to create a `plugin`

In, `htmllinter` plugins are nothing but simple object having a `ruleName` property and a `rule` property which is the defination of the rule
that is written as `posthtml` plugin, which are then wrapped with `htmllinter.createHTMLLintPlugin` method which passes some
usefull data to help developing the rule

## Rule file

A simple rule having as mentioned ealier, is a module exporting two properties

Suppose you have a folder name `rule` inside `src`, then 

`<your-plugin-name>/src/rules/your-rule-name.js`

```js
module.exports = {
  ruleName: 'your-rule-name-here',
  rule : (options = {}, reporter = [], reportNode = []) => {
      
      return function(tree){
        tree.walk(node => {
          ...
          // use the 'reporter` array to pass your message to `htmllinter` reporter
          reporter.push({ message: 'there is some linting err at tag `p`', node })
        })
      } 
  }
}
```

Now while exporting the rule, wrap it with `htmllinter.createHTMLLintPlugin` method

`<your-plugin-name>/src/index.js`

```js
const htmllinter = require('htmllinter')
const myRule = require('./rules/your-rule-name')

const {ruleName, rule} = myRule

module.exports = {
  [ruleName] : function(html){
    return htmllinter.createHTMLLintPlugin(html, {ruleName, rule})
  }
}
```


#### Usage

Now user can install your plugin use it in `htmllinter.config.js` like this

```js
module.exports = {
  plugins : [require('your-plugin-name')],
  rules : {
      'your-rule-name-from-plugin' : 'on'
  }
}

```

Thats it :tada:

> __It is recommended to document about enabling the rules comming from the `plugin` better as it would help the developer to use it better__
