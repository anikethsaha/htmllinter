const { fork } = require('child_process');
const path = require('path');

exports.spawnRegistry = () => {
  return new Promise((resolve, reject) => {
    const pathVerdaccioModule = require.resolve('verdaccio/bin/verdaccio');
    const configPath = path.join(__dirname, 'config.yaml');
    const childFork = fork(pathVerdaccioModule, ['-c', configPath], {
      silent: false,
    });

    childFork.on('message', (msg) => {
      if ('verdaccio_started' in msg) {
        resolve(childFork);
      }
    });

    childFork.on('error', (err) => {
      reject([err]);
    });
  });
};
