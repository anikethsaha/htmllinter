# How to create a rule 

In, `htmllinter` rules are nothing but simple object having a `ruleName` property and a `rule` property which is the defination of the rule
that is written as `posthtml` plugin, which are then wrapped with `htmllinter.createHTMLLintPlugin` method which passes some
usefull data to help developing the rule

## Rule file

A simple rule having as mentioned ealier, is a module exporting two properties

Suppose you have a folder name `rule` inside `src`, then 

`src/rules/your-rule-name.js`

```js
module.exports = {
  ruleName: 'your-rule-name-here',
  rule : (options = {}, reporter = [], reportNode = []) => {
      
      return function(tree){
        tree.walk(node => {
          ...
          // use the 'reporter` array to pass your message to `htmllinter` reporter
          reporter.push('there is some linting err at tag `p` ')
        })
      } 
  }
}
```

Now while exporting the rule, wrap it with `htmllinter.createHTMLLintPlugin` method

`src/index.js`

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

Now if you want your rule to be available as `standard (groups of rules which will be on by default from user's config)` or as plugin the only
difference is you need to export extra property if its for `extend` and no change for if its `plugin`


### For `plugins` 

There is no change need for `plugins` as rules for plugins must be configured by the user at their `htmllinter.config.js`

**Please refer the `plugins` example present [`here`](https://github.com/anikethsaha/htmllinter/tree/master/examples/plugins)**


### For `extend`

in your `src/index.js` you need to export two things `plugins` objects and `rules` object

`src/index.js`

```js
const htmllinter = require('htmllinter')
const myRule = require('./rules/your-rule-name')

const {ruleName, rule} = myRule

exports.plugins = {
  [ruleName] : function(html){
    return htmllinter.createHTMLLintPlugin(html, {ruleName, rule})
  }
}

exports.rules = {
  [ruleName] : 'on' // or 'off'
}
```

Thats it :tada: . 

## Contribute

Please feel free to submit any improvement you think would be better to make this docs easy and more understandable.
