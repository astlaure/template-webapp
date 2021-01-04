import { Strategy } from 'passport-local';
import User from '../users/user.model';
import bcryptUtil from '../bcrypt/bcrypt.util';

const LocalStrategy = new Strategy({
  usernameField: 'username',
  passwordField: 'password',
  session: true,
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !await bcryptUtil.decode(password, user.password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

export default LocalStrategy;
