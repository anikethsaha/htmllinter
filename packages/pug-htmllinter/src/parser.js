import lexer from 'pug-lexer';
import parser from 'pug-parser';

export default (src) => {
  const tokens = lexer(src);
  const ast = parser(tokens, { src });

  return ast;
};
