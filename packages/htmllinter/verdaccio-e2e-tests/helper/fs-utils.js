const fs = require('fs');
const path = require('path');
const os = require('os');

exports.getTempFolder = () => {
  const tempRoot = fs.mkdtempSync(
    path.join(fs.realpathSync(os.tmpdir()), 'verdaccio-e2e-htmllinter')
  );

  return tempRoot;
};
