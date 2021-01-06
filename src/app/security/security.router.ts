import express from 'express';
import security from './security';
import authMiddleware from './auth/auth.middleware';
import limiter from '../core/limiter';
import User from './users/user.model';

const securityRouter = express.Router();
const localMiddleware = security.authenticate('local', { session: true });

securityRouter.use(limiter);

securityRouter.get('/userinfo', authMiddleware, (req, res) => {
  const { username, role } = req.user as User;
  return res.json({
    username,
    role: role.name,
  });
});

securityRouter.post('/login', localMiddleware, (req, res) => {
  const { username, role } = req.user as User;
  return res.json({
    username,
    role: role.name,
  });
});

securityRouter.post('/logout', authMiddleware, (req, res) => {
  req.logout();
  return res.sendStatus(200);
});

export default securityRouter;
