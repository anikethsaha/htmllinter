const path = require('path');
const { spawnRegistry } = require('./helper/registry');
const { runNmp } = require('./helper/npm');
const { runCli } = require('./helper/cli');
const { getTempFolder } = require('./helper/fs-utils');
const pkg = require('../package.json');

jest.setTimeout(40000);

const version = pkg.version;

describe('E2E htmllinter cli', () => {
  let childFork;
  const folder = getTempFolder();
  beforeAll(async () => {
    childFork = await spawnRegistry();
    await runNmp(['publish', '--registry', 'http://localhost:4873']);

    await runNmp([
      'install',
      `@htmllinter/core@${version}`,
      '--prefix',
      folder,
      '--registry',
      'http://localhost:4873',
    ]);
  });

  afterAll(() => {
    if (childFork) {
      childFork.kill();
    }
  });

  it('should show the help output', async (done) => {
    const helpOutput = await runCli(
      path.join(folder, 'node_modules', '.bin', 'htmllinter'),
      []
    );
    expect(helpOutput).toMatchSnapshot();
    done();
  });

  it('should show the path of the input when input is passed but no linting rules', async (done) => {
    const output = await runCli(
      path.join(folder, 'node_modules', '.bin', 'htmllinter'),
      [path.join(__dirname, './fixture/simple/input.html')]
    );

    expect(output.split('/').slice(2, -1)).toMatchObject([
      'htmllinter',
      'packages',
      'htmllinter',
      'verdaccio-e2e-tests',
      'fixture',
      'simple',
    ]);
    done();
  });
});
