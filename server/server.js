// DEPENDENCIES
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

dotenv.load();

let strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:5000/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        // console.log(profile);
        let client_id = profile._json.sub.split('|');
        console.log(profile._json.nickname);
        console.log(client_id[1]);
        return done(null, profile);
    }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
    done(null, user);
});
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
});

const server = express();

// MIDDLEWARE
const configureMiddleware = require('./config/middleware');

configureMiddleware(server);

const sessionConfig = {
    secret: 'TKd8^S$W-HPS3NtF',
    cookie: {},
    resave: false,
    saveUninitialized: true
};

server.use(session(sessionConfig));

server.use(passport.initialize());
server.use(passport.session());

// ROUTES
// const userInViews = require('./config/userInViews');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// server.use(userInViews());
server.use('/', authRouter);
server.use('/', indexRouter);
server.use('/', usersRouter);

// Error handlers
// Catch 404 and forward to error handler
server.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // Development error handler
  // Will print stacktrace
  if (server.get('env') === 'development') {
    server.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    });
  }
  
  // Production error handler
  // No stacktraces leaked to user
  server.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });

module.exports = server;
