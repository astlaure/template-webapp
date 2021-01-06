import { Strategy } from 'passport-local';
import User from '../users/user.model';
import bcryptUtil from '../bcrypt/bcrypt.util';
import logger from '../../core/logger';
import Role from '../roles/role.model';

const LocalStrategy = new Strategy({
  usernameField: 'username',
  passwordField: 'password',
  session: true,
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username }, include: { model: Role, as: 'role' } });

    if (!user || !await bcryptUtil.decode(password, user.password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    logger.error(err);
    return done(err);
  }
});

export default LocalStrategy;
