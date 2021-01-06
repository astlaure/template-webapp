import passport from 'passport';
import User from './users/user.model';
import LocalStrategy from './strategies/local.strategy';
import RememberMeStrategy from './strategies/remember-me.strategy';
import Role from './roles/role.model';

passport.use(LocalStrategy);
passport.use(RememberMeStrategy);

passport.serializeUser((user, done) => {
  const { id } = user as User;
  return done(null, id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id, { include: { model: Role, as: 'role' } });

    if (!user || !user.enabled) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const security = passport;

export default security;
