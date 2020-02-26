import resolveExternalPlugins from '../resolveExternalPlugins';

describe('resolveExternalPlugins', () => {
  it('should not return any plugin as config.rules is not passed', async () => {
    const result = await resolveExternalPlugins([
      require('./utils/examplePlugin'),
    ]);
    expect(result.length).toBe(0);
  });

  it('should not return any plugin as config.rules passed is {}', async () => {
    const result = await resolveExternalPlugins(
      [require('./utils/examplePlugin')],
      {}
    );
    expect(result.length).toBe(0);
  });

  it('should not return any plugin as config.rules passed is off for this plugin', async () => {
    const result = await resolveExternalPlugins(
      [require('./utils/examplePlugin')],
      {
        'no-bool-true-explicit-define': 'off',
      }
    );
    expect(result.length).toBe(0);
  });

  it('should  return  plugin is config.rules passed is on for this plugin', async () => {
    const result = await resolveExternalPlugins(
      [require('./utils/examplePlugin')],
      {
        'no-bool-true-explicit-define': 'on',
      }
    );
    expect(result.length).toBe(1);
  });
});
