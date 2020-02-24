const path = require('path');
const fs = require('fs');

const linter = require('./src');

const input = fs.readFileSync(path.join(__dirname, './input.html'), 'utf8');

const config = require('./htmllinter.config.js');

console.log('config-----------', config);

linter.run(input, config);
