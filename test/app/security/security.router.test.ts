import request from 'supertest';
import sessionUtil, { Session } from '../../__tools__/session.util';
import User from '../../../src/app/security/users/user.model';
import app from '../../../src/app/app';

describe('Security Router', () => {
  let session: Session;

  beforeAll(async () => {
    session = await sessionUtil.createSession();
  });

  test('When the user is authenticated retrieve userinfo', async () => {
    const response = await request(app)
      .get('/api/security/userinfo')
      .set('Accept', 'application/json')
      .set('Cookie', session.authenticated.cookies);

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('jest@test.io');
    expect(response.body.role).toBe('KING');
  });

  test('When an authenticated user is disabled', async () => {
    const mockedUser: Partial<User> = {};
    mockedUser.enabled = false;
    const spyUser = jest.spyOn(User, 'findByPk').mockResolvedValue(mockedUser as User);
    const response = await request(app)
      .get('/api/security/userinfo')
      .set('Accept', 'application/json')
      .set('Cookie', session.authenticated.cookies);

    expect(response.status).toBe(401);
    spyUser.mockRestore();
  });

  test('When an authenticated user is not found', async () => {
    const spyUser = jest.spyOn(User, 'findByPk').mockResolvedValue(null);
    const response = await request(app)
      .get('/api/security/userinfo')
      .set('Accept', 'application/json')
      .set('Cookie', session.authenticated.cookies);

    expect(response.status).toBe(401);
    spyUser.mockRestore();
  });

  test('When an authenticated user throws an error', async () => {
    const spyUser = jest.spyOn(User, 'findByPk').mockRejectedValue(null);
    const response = await request(app)
      .get('/api/security/userinfo')
      .set('Accept', 'application/json')
      .set('Cookie', session.authenticated.cookies);

    expect(response.status).toBe(500);
    spyUser.mockRestore();
  });

  test('When the user is not authenticated do not retrieve userinfo', async () => {
    const response = await request(app)
      .get('/api/security/userinfo')
      .set('Accept', 'application/json')
      .set('Cookie', session.anonymous.cookies);

    expect(response.status).toBe(401);
  });

  test('When the user login with correct credentials', async () => {
    const response = await request(app)
      .post('/api/security/login')
      .send({ username: 'jest@test.io', password: 'supertest' })
      .set('Accept', 'application/json')
      .set('Cookie', session.anonymous.cookies)
      .set('X-XSRF-TOKEN', session.anonymous.csrfToken);

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('jest@test.io');
    expect(response.body.role).toBe('KING');
  });

  test('When the user is authenticated logout successfully', async () => {
    const response = await request(app)
      .post('/api/security/logout')
      .set('Accept', 'application/json')
      .set('Cookie', session.authenticated.cookies)
      .set('X-XSRF-TOKEN', session.authenticated.csrfToken);

    expect(response.status).toBe(200);
    const setCookies = response.headers['set-cookie'].filter((cookie: string) => {
      return cookie.startsWith('express:sess');
    });
    expect(setCookies.length).toBe(2);
  });

  test('When the user is not authenticated do not logout', async () => {
    const response = await request(app)
      .post('/api/security/logout')
      .set('Accept', 'application/json')
      .set('Cookie', session.anonymous.cookies)
      .set('X-XSRF-TOKEN', session.anonymous.csrfToken);

    expect(response.status).toBe(401);
  });
});
