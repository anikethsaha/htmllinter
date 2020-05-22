import { ESLint } from 'eslint';

const severityMap = {
  1: 'error',
  2: 'warn',
};

export default {
  ruleName: 'eslint',
  meta: {
    schema: {
      type: 'object',
      properties: {
        eslintOptions: {
          type: 'object',
          default: {},
        },
      },
      additionalProperties: false,
    },
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = []) {
    const eslintOptions = options.eslintOptions || {};
    return (tree) => {
      const promiz = [];

      tree.match({ type: 'tag', name: 'script' }, (node) => {
        if (node.content) {
          const eslint = new ESLint(eslintOptions);
          node.content.forEach((contentNode) => {
            const { content } = contentNode;
            if (content) {
              promiz.push(
                eslint.lintText(content).then((results) => {
                  const { messages } = results[0];

                  messages.forEach((message) => {
                    reporter.push({
                      message: message.message,
                      severity: severityMap[message.severity] || 'error',
                      subRuleName: message.ruleId,
                      node: {
                        location: {
                          line: node.location.line + message.line,
                          col: message.column,
                        },
                      },
                    });
                  });
                })
              );
            }
          });
        }
        return node;
      });

      return promiz.length > 0
        ? Promise.all(promiz).then(() => {
            return tree;
          })
        : tree;
    };
  },
};
