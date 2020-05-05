module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/^_(.)+/',
    '/helper/',
    '/testplugins/',
    'fixtures',
    'utils',
  ],
  modulePathIgnorePatterns: ['<rootDir>/package.json'],
  testMatch: ['**/*.test.js'],
};
