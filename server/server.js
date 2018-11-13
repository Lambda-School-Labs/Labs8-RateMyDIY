// DEPENDENCIES
const express = require("express");

const server = express();

const db = require("./config/dbConfig");

// MIDDLEWARE
const configureMiddleware = require("./config/middleware");

configureMiddleware(server);

// // ROUTES
// const exampleRoutes = require('./routes/exampleRoutes');

// SANITY CHECK
server.get("/", (req, res) => {
  res.send(
    `Believe it or not, this is the first endpoint added to the great RateMyDIY project.`
  );
});

server.get("/hello", (req, res) => {
  console.log("hey");
  res.send("hi");
});

const userRoutes = require("./routes/userRoutes");
const projectsRoutes = require("./routes/projectsRoutes");

server.use("/", userRoutes);
server.use("/", projectsRoutes);

// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Error handlers
// Catch 404 and forward to error handler
server.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Development error handler
// Will print stacktrace
if (server.get("env") === "development") {
  server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = server;
