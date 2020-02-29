# Pass data from config to `rule`/`plugin`

## User's Guide 

You can pass any type of data from your config `htmllinter.config.js` to a rule's definition (`plugin`) only if plugin supports passing it 
and wrong a compatible plugin to handle it which is pretty easy to write as its just an extra `return function` 

Anyway, lets pass some data

`no-empty-tag` rule accepts a options name `ignore` which is to tell the plugin to ignore reporting the error for a particular `tag`(elements) even if 
it has empty content

example

`input.html`

```html
<h1></h1>
<p></p>
```

`htmllinter.config.js`

```js
module.export = {
  extend : require('@htmllinter/basic-config`),
  rules : {
    'no-empty-tag' : ['on', {ignore : ['p']}]
  }
}
```
And running the `htmllinter` , you can notice that it will throw only one error and that too for `h1` tag


## Developer's Guide

For `plugins`/`rule`'s definiation to accept data from config as options, there is only one step to change if you have followed the 
[**How to create a `plugin`/`rule` guide**](https://github.com/anikethsaha/htmllinter/blob/master/docs/how-to-create-plugin.md).

this is the following changes you need if you want your plugin to accept data from config as options

`<your-plugin-name>/src/index.js`

```diff
const htmllinter = require('htmllinter')
const myRule = require('./rules/your-rule-name')

const {ruleName, rule} = myRule

module.exports = {
-  [ruleName] : function(html){
-    return htmllinter.createHTMLLintPlugin(html, {ruleName, rule})
-  }
+  [ruleName] : function(options = {}){
+          return function(html){
+             return htmllinter.createHTMLLintPlugin(html, {ruleName, rule},options)
+        }
+  }
}
```


And in config's rule, it can pass data of any type like this

`htmllinter.config.js`
```js
{
  rules : ['on', data] // the first index value of this array should be 'on' otherwise your plugin wont run
}
```




