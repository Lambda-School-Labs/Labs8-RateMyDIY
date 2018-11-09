// DEPENDENCIES
const express = require('express');

const server = express();

// SESSION STORE
var session = require('express-session');
var KnexSessionStore = require('connect-session-knex')(session);
var store = new KnexSessionStore(/* options here */);

server.use(session({
  store: store,
  secret: [process.env.SESSION_SECRET || 'this_is_not_a_very_good_secret'],
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
  resave: true,
  saveUninitialized: true
}));

// MIDDLEWARE
const configureMiddleware = require('./config/middleware');

configureMiddleware(server);

// // ROUTES
// const exampleRoutes = require('./routes/exampleRoutes');


// SANITY CHECK
server.get('/', (req, res) => {
  res.send(`Believe it or not, this is the first endpoint added to the great RateMyDIY project.`)
});

const userRoutes = require('./routes/userRoutes');
const projectsRoutes = require('./routes/projectsRoutes');

server.use('/', userRoutes);
server.use('/', projectsRoutes);

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
