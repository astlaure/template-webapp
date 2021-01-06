import request from 'supertest';
import app from '../../src/app/app';

describe('App Router', () => {
  test('when the * endpoint is called return the index.html file', () => {
    return request(app)
      .get('/jest')
      .expect(200)
      .expect('Content-Type', /text/)
      .then((response) => {
        expect(response.text).toContain('<!doctype html>');
      });
  });
});
