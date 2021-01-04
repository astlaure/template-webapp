import crypto from 'crypto';
import { Strategy } from 'passport-remember-me-extended';
import User from '../users/user.model';

const RememberMeStrategy = new Strategy(
  async (token, done) => {
    try {
      const user = await User.findOne({ where: { rememberToken: token } });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  },
  async (user: User, done) => {
    try {
      // eslint-disable-next-line no-param-reassign
      user.rememberToken = crypto.randomBytes(32).toString('hex');

      await user.save();

      return done(null, user.rememberToken);
    } catch (err) {
      return done(err);
    }
  },
);

export default RememberMeStrategy;
