import express from 'express';
import security from './security';
import authMiddleware from './auth/auth.middleware';
import limiter from '../core/limiter';

const securityRouter = express.Router();
const localMiddleware = security.authenticate('local', { session: true });

securityRouter.use(limiter);

securityRouter.post('/userinfo', authMiddleware, (req, res) => {
  const { username, role } = res.locals.user;
  return res.json({
    username,
    role,
  });
});

securityRouter.post('/login', localMiddleware, (req, res) => {
  const { username, role } = res.locals.user;
  return res.json({
    username,
    role,
  });
});

securityRouter.post('/logout', authMiddleware, (req, res) => {
  req.logout();
  return res.sendStatus(200);
});

export default securityRouter;
