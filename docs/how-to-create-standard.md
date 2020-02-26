# How to create a `standard`


In, `htmllinter` `standard` are nothing but simple object having a `plugins` and `rules` being exported which has the object of plugins and 
`rules` in it.

## Rule file

A simple rule having as mentioned ealier, is a module exporting two properties

Suppose you have a folder name `rule` inside `src`, then 

`<your-standard-package>src/rules/your-rule-name.js`

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

As in rules, its recommeneded to package more than one rule else you should go for `plugins`

`<your-standard-package>src/rules/your-rule-name2.js`
```js
module.exports = {
  ruleName: 'your-rule2-name-here',
  rule : (options = {}, reporter = [], reportNode = []) => {
      
      return function(tree){
        tree.walk(node => {
          ...
          // use the 'reporter` array to pass your message to `htmllinter` reporter
          reporter.push('there is some linting err at tag `p` rule 2')
        })
      } 
  }
}
```


Now while exporting the rule, wrap it with `htmllinter.createHTMLLintPlugin` method

`<your-standard-package>/src/index.js`

```js
const htmllinter = require('htmllinter')
const myRule = require('./rules/your-rule-name')
const myRule2 = require('./rules/your-rule-name2')



exports.plugins = {
  [myRule.ruleName] : function(html){
    return htmllinter.createHTMLLintPlugin(html, myRule)
  },
  [myRule2.ruleName] : function(html){
    return htmllinter.createHTMLLintPlugin(html, myRule2)
  }
}

exports.rules = {
  [myRule.ruleName] : 'on' // or 'off',
  [myRule2.ruleName] : 'on' // or 'off'
}

```

Thats it :tada:


> These rules can be turned `off`/`on` from user's config file as well
