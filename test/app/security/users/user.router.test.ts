import request from 'supertest';
import sessionUtil, { Session } from '../../../__tools__/session.util';
import User from '../../../../src/app/security/users/user.model';
import app from '../../../../src/app/app';

describe('User Router', () => {
  let session: Session;

  beforeAll(async () => {
    session = await sessionUtil.createSession();
  });

  test('When the admin create a user with correct data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ username: 'jest-create@test.io', password: 'supertest', roleId: 1 })
      .set('Accept', 'application/json')
      .set('Cookie', session.authenticated.cookies)
      .set('X-XSRF-TOKEN', session.authenticated.csrfToken);

    expect(response.status).toBe(201);
  });

  test('When the admin create a user with bad data return errors', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ username: 'jest-bad', password: 'supertest', roleId: 1 })
      .set('Accept', 'application/json')
      .set('Cookie', session.authenticated.cookies)
      .set('X-XSRF-TOKEN', session.authenticated.csrfToken);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was validation issues');
  });

  test('When the admin create a user it throws an error', async () => {
    const spyUser = jest.spyOn(User, 'create').mockRejectedValue('Mock throw');
    const response = await request(app)
      .post('/api/users')
      .send({ username: 'jest-bad', password: 'supertest', roleId: 1 })
      .set('Accept', 'application/json')
      .set('Cookie', session.authenticated.cookies)
      .set('X-XSRF-TOKEN', session.authenticated.csrfToken);

    expect(response.status).toBe(500);
    spyUser.mockRestore();
  });
});
