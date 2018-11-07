// DEPENDENCIES
const express = require('express');

const server = express();

// MIDDLEWARE
const configureMiddleware = require('./config/middleware');

configureMiddleware(server);

// ROUTES
// const userInViews = require('./config/userInViews');
// const authRouter = require('./routes/oldauth/auth');
// const indexRouter = require('./routes/oldauth/index');
// const usersRouter = require('./routes/oldauth/users');

// server.use(userInViews());
// server.use('/', authRouter);
// server.use('/', indexRouter);
// server.use('/', usersRouter);
const cb = require('./routes/cb');

server.use('/', cb);

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
