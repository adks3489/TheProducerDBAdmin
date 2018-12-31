const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let initLoginAPI = (app, userManager) => {
  passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    let user = userManager.find(username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password != password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    let user = userManager.findById(id);
    done(null, user);
  });

  app.use(session({
    secret: "james",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('http://localhost:1235/');
  });
}

module.exports = initLoginAPI;