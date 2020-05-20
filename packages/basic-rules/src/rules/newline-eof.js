export default {
  ruleName: 'newline-eof',
  meta: {
    schema: {
      type: 'object',
      properties: {
        numberOfLines: {
          type: 'integer',
          default: 1,
        },
      },
      additionalProperties: false,
    },
  },
  // eslint-disable-next-line no-unused-vars
  rule: function(options = {}, reporter = []) {
    const numberOfLines = options.numberOfLines;
    return (tree) => {
      const sourceArr = tree.source.split('\n');
      const isEOF = sourceArr
        .slice(sourceArr.length - numberOfLines)
        .every((s) => s === '');
      if (!isEOF) {
        reporter.push({
          message: `end of file should have ${numberOfLines} empty lines`,
          node: {
            location: {
              line: sourceArr.length,
              col: 0,
            },
          },
        });
      }
    };
  },
};
