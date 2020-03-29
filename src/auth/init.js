const passport = require('passport');
const AnonymousStrategy = require('passport-anonymous');
const jwtStrategy = require('./jwt');
const initRoutes = require('../routes/init');
const authRoutes = require('./routes');

const initUsers = (User, config, router) => {
  passport.use(User.createStrategy());

  if (config.user.auth.strategy === 'jwt') {
    passport.use(jwtStrategy(User));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
  }
  passport.use(new AnonymousStrategy.Strategy());

  router.use('', initRoutes(User));
  router.use('', authRoutes(config, User));
};

module.exports = initUsers;
