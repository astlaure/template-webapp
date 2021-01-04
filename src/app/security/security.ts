import passport from 'passport';
import User from './users/user.model';
import LocalStrategy from './strategies/local.strategy';
import RememberMeStrategy from './strategies/remember-me.strategy';

passport.use(LocalStrategy);
passport.use(RememberMeStrategy);

passport.serializeUser((user, done) => {
  const { id } = user as User;
  return done(null, id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);

    if (!user || !user.enabled) {
      return done(null, false);
    }

    return done(null, user.id);
  } catch (err) {
    return done(err);
  }
});

const security = passport;

export default security;
