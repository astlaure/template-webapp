import app from '../../src/app/app';

describe('App Test Suite', () => {
  test('Server start', () => {
    const server = app.listen(3000);

    expect(server).toBeDefined();
    server.close();
  });
});
