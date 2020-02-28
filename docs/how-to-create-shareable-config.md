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
