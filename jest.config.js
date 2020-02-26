module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/^_(.)+/',
    '/helper/',
    '/testplugins/',
  ],
  modulePathIgnorePatterns: ['<rootDir>/package.json'],
  testMatch: ['**/*.test.js'],
};
