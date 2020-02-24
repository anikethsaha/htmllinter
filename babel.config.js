module.exports = {
  presets: [
    [
      // ES features necessary for user's Node version
      '@babel/preset-env',
      {
        targets: {
          node: '6.9.0',
        },
      },
    ],
  ],
};
