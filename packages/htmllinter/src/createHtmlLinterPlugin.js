import { validateRuleSchema } from './utils/schemaValidator';

export default (
  tree,
  { ruleName, rule, meta = { schema: {} } },
  options = {}
) => {
  const reporter = [];
  const reportNode = []; // T.O.D.O : not ready yet

  validateRuleSchema(meta.schema, options);

  const plugin = rule(options, reporter, reportNode)(tree);
  tree.messages
    .filter((msg) => msg.htmlLinter !== undefined)
    .map((msg) => {
      const msgToPush = {};

      msgToPush[ruleName] = reporter;

      msg.htmlLinter = {
        ...msg.htmlLinter,
        ...msgToPush,
      };

      /**
       * TODO
       * handle `reportNode`
       */

      return msg;
    });

  return plugin;
};
