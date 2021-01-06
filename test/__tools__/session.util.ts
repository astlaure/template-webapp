import request from 'supertest';
import database from '../../src/app/database/database';
import Role from '../../src/app/security/roles/role.model';
import User from '../../src/app/security/users/user.model';
import bcryptUtil from '../../src/app/security/bcrypt/bcrypt.util';
import app from '../../src/app/app';

export interface SessionData {
  cookies: string[];
  csrfToken: string;
}

export interface Session {
  anonymous: SessionData;
  authenticated: SessionData;
}

const createSession = async () => {
  const session: Session = { anonymous: { cookies: [], csrfToken: '' }, authenticated: { cookies: [], csrfToken: '' } };

  await database.sync();
  const role = await Role.create({
    name: 'KING',
  });
  await User.create({
    username: 'jest@test.io',
    password: await bcryptUtil.encode('supertest'),
    roleId: role.id,
  });

  const anonymousResponse = await request(app)
    .get('/jest');
  session.anonymous = parseSetCookieHeader(anonymousResponse.headers['set-cookie']);

  const authenticatedResponse = await request(app)
    .post('/api/security/login')
    .set('Accept', 'application/json')
    .set('Cookie', session.anonymous.cookies)
    .set('X-XSRF-TOKEN', session.anonymous.csrfToken)
    .send({ username: 'jest@test.io', password: 'supertest' });

  session.authenticated = parseSetCookieHeader(authenticatedResponse.headers['set-cookie']);
  if (!session.authenticated.csrfToken) {
    session.authenticated.cookies.push(`XSRF-TOKEN=${session.anonymous.csrfToken}`);
    session.authenticated.csrfToken = session.anonymous.csrfToken;
  }

  return session;
};

const parseSetCookieHeader = (setCookie: string[]): SessionData => {
  const sessionData: SessionData = { cookies: [], csrfToken: '' };
  setCookie.forEach((cookie) => {
    const value = cookie
      .replace(/; /g, '')
      .replace(/Path=\//gi, '')
      .replace(/HttpOnly/gi, '');

    if (value.startsWith('XSRF-TOKEN=')) {
      sessionData.csrfToken = value.replace('XSRF-TOKEN=', '');
    }

    sessionData.cookies.push(value);
  });
  return sessionData;
};

const sessionUtil = {
  createSession,
  parseSetCookieHeader,
};

export default sessionUtil;
