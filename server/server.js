// // DEPENDENCIES
// const express = require('express');

// const server = express();

// // MIDDLEWARE
// const configureMiddleware = require('./config/middleware');

// configureMiddleware(server);

// // ROUTES
// const exampleRoutes = require('./routes/exampleRoutes');


// SANITY CHECK
server.get('/', (req, res) => {
  res.send(`Believe it or not, this is the first endpoint added to the great RateMyDIY project.`)
});

server.use('/api/example', exampleRoutes);


// module.exports = server;
