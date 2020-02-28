# How to create a shareable `config`

In `htmllinter`, you can share your config which is `htmllinter.config.js` as a package. The package exports three properties.

- `plugins` : 
   type: `Array<Object>`  
   the list of the plugins as a array 

- `extend`
   type: `Module (config)`  
   the config which is of type `htmllinter` 's config 

- `rules`
   type: `Object`
   contains the property of `{ruleName : ruleDefination}`


### `Plugin`

[**REFER the plugin authoring guide**]()

Suppose this is in folder `<rulename>` and usually in config it is recommended to have multiple plugins , so for this docs, we can consider having plugins like `<rule-name1>`, `<rule-name2>`, `<rule-name3>` etc.

### config project

In `src/index.js`, import all the plugins and simply exports them


```js
import ruleName1 from 'rule-name1';
import ruleName2 from 'rule-name2';
import ruleName3 from 'rule-name3';
.
.

exports default {
   plugins: [ruleName1, ruleName2, ruleName3],
  rules: {
    'rulename1': 'on',
    'rulename2': 'on',
    'rulename3': 'on',
  }
}

```


You can even  extend other `config` like this 

```js
import ruleName1 from 'rule-name1';
import ruleName2 from 'rule-name2';
import ruleName3 from 'rule-name3';
.
.

exports default {
  extend : require('@htmllinter/basic-config'),   // or some other config files
  plugins: [ruleName1, ruleName2, ruleName3],
  rules: {
    'rulename1': 'on',
    'rulename2': 'on',
    'rulename3': 'on',
  }
}
```

Thats it :tada:

> These rules can be turned `off`/`on` from user's config file as well


## How it works

the `htmllinter.run` api takes two paramets, 
- `html` which is the html input as `string`
- `config` which is the config from user's `htmllinter.config.js`

If user's config consist this


`htmllinter.config.js`

```js
{
  extend : require('@htmllinter/basic-config'),
  plugins : [require('my-own-plugin')],
  rules : {
    'my-own-plugin' : 'off'
  }
  
}

```

the, node's require aglorithm method will transform it like this 

```js
{
  extend : {
      plugins: [basicRules],
      rules: {
      'no-empty-tag': 'on',
      'no-duplicate-id': 'on',
      'no-bool-true-explicit-define': 'on',
    }
  },
  plugins : [require('my-own-plugin')],
  rules : {
    'my-own-plugin' : 'off'
  }
  
}
```

`basicRules` module consist 

```
{
   'no-empty-tag': html => core.createHTMLLintPlugin(html, noEmptyTag),
   'no-duplicate-id': html => core.createHTMLLintPlugin(html, noDupId),
   'no-bool-true-explicit-define': html => core.createHTMLLintPlugin(html, noBoolTrueExplicitDefine)

}

```
So, again node will tranform it like this 

```js
{
  extend : {
      plugins: [
          {
             'no-empty-tag': html => core.createHTMLLintPlugin(html, noEmptyTag),
             'no-duplicate-id': html => core.createHTMLLintPlugin(html, noDupId),
             'no-bool-true-explicit-define': html => core.createHTMLLintPlugin(html, noBoolTrueExplicitDefine)
          }
      ],
      rules: {
      'no-empty-tag': 'on',
      'no-duplicate-id': 'on',
      'no-bool-true-explicit-define': 'on',
    }
  },
  plugins : [require('my-own-plugin')],
  rules : {
    'my-own-plugin' : 'off'
  }
  
}
```

Now , `htmllinter`'s config resolver method will transform the whole like this


```js
{
  plugins : [
    'no-empty-tag': html => core.createHTMLLintPlugin(html, noEmptyTag),
    'no-duplicate-id': html => core.createHTMLLintPlugin(html, noDupId),
    'no-bool-true-explicit-define': html => core.createHTMLLintPlugin(html, noBoolTrueExplicitDefine,
    'my-own-plugin': html => core.createHTMLLintPlugin(html, myQwnPlugin),
  ],
  rules : {
    'no-empty-tag': 'on',
    'no-duplicate-id': 'on',
    'no-bool-true-explicit-define': 'on',
    'my-own-plugin' : 'off'
  }
  
}
```


