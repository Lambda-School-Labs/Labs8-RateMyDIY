// DEPENDENCIES
const express = require('express');

const server = express();

// MIDDLEWARE
const configureMiddleware = require('./config/middleware');

configureMiddleware(server);

// // ROUTES
// const exampleRoutes = require('./routes/exampleRoutes');


// SANITY CHECK
server.get('/', (req, res) => {
  res.send(`Believe it or not, this is the first endpoint added to the great RateMyDIY project.`)
});

const routes = require('./routes/userRoutes');

server.use('/', routes);

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
