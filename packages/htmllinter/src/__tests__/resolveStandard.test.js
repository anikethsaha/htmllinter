import resolveStandards from '../resolveStandards';

/**
 * config = { standard:
       { plugins:
          { 'no-empty-tag': [Function: no-empty-tag],
            'no-duplicate-id': [Function: no-duplicate-id],
            'no-bool-true-explicit-define': [Function: no-bool-true-explicit-define] },
         rules:
          { 'no-empty-tag': 'on',
            'no-duplicate-id': 'on',
            'no-bool-true-explicit-define': 'on' } } }
 *
 */
describe('testing resolveStandards', () => {
  it('should not return any plugins as rules passed is empty object :  {}', async () => {
    // plugins are nothing but a function
    const mockPlugin = () => 'done from plugin';

    const result = await resolveStandards(
      {
        plugins: {
          'no-empty-tag': mockPlugin,
        },
      },
      {}
    );
    expect(result.length).toBe(0);
  });

  it('should match the mocking plugin fn s output : no rules passed', async () => {
    // plugins are nothing but a function
    const mockPlugin = () => 'done from plugin';

    const result = await resolveStandards({
      plugins: {
        'no-empty-tag': mockPlugin,
      },
    });
    expect(result.length).toBe(1);
    expect(mockPlugin()).toBe(result[0]());
  });

  it('should match the mocking plugin fn s output', async () => {
    // plugins are nothing but a function
    const mockPlugin = (typ) => `done from plugin ${typ}`;

    const result = await resolveStandards(
      {
        plugins: {
          'no-duplicate-id': mockPlugin.bind(this, 'no-duplicate-id'),
          'no-empty-tag': mockPlugin.bind(this, 'no-empty-tag'),
        },
        rules: {
          'no-duplicate-id': 'on',
          'no-empty-tag': 'on',
        },
      },
      {
        'no-empty-tag': 'off',
      }
    );
    expect(result.length).toBe(1);
    expect(mockPlugin('no-duplicate-id')).toBe(result[0]()); // testing the plugin which is actually running
  });
});
