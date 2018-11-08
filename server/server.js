// // DEPENDENCIES
// const express = require('express');

// const server = express();

// // MIDDLEWARE
// const configureMiddleware = require('./config/middleware');

// configureMiddleware(server);

<<<<<<< HEAD
// ROUTES
// const userInViews = require('./config/userInViews');
// const authRouter = require('./routes/oldauth/auth');
// const indexRouter = require('./routes/oldauth/index');
// const usersRouter = require('./routes/oldauth/users');
=======
// // ROUTES
// const exampleRoutes = require('./routes/exampleRoutes');


// SANITY CHECK
server.get('/', (req, res) => {
  res.send(`Believe it or not, this is the first endpoint added to the great RateMyDIY project.`)
});
>>>>>>> bbc647cab5030a89c6c1774a658c37cd2f9e77a3

// server.use(userInViews());
// server.use('/', authRouter);
// server.use('/', indexRouter);
// server.use('/', usersRouter);
const cb = require('./routes/routes');

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


// module.exports = server;
