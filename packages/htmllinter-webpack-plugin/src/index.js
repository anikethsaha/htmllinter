import assert from 'assert';
import { run } from '@htmllinter/core';

class HtmllinterWebpackPlugin {
  constructor(options = {}) {
    this.config = options.config || {};
    this.pluginName = 'htmllinter-webpack-plugin';
  }
  apply(compiler) {
    const logger = compiler.getInfrastructureLogger(this.pluginName);
    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      let hook = compilation.hooks.htmlWebpackPluginAfterHtmlProcessing;

      if (!hook) {
        const [HtmlWebpackPlugin] = compiler.options.plugins.filter(
          (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
        );

        assert(
          HtmlWebpackPlugin,
          'Unable to find an instance of ' +
            'HtmlWebpackPlugin in the current compilation.'
        );
        hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit;
      }

      hook.tapAsync(this.pluginName, async (data, cb) => {
        logger.info(`Results of linting ${data.outputName}`);
        const results = await run(data.html, this.config);
        results.forEach(
          ({
            message,
            type,
            ruleName,
            node: {
              location: { line, col },
            },
          }) => {
            logger[type](`${line}:${col} ${message} \t ${ruleName}`);
          }
        );
        cb(null, data);
      });
    });
  }
}

export default HtmllinterWebpackPlugin;
