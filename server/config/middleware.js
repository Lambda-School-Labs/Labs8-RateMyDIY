<<<<<<< HEAD
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const strategy = require('../setup-passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const sessionConfig = {
    secret: 'TKd8^S$W-HPS3NtF',
    resave: false,
    saveUninitialized: false
};

module.exports = server => {
	server.use(logger('tiny'));
	server.use(cors());
	server.use(helmet());
	server.use(express.json());
	server.use(cookieParser());
	server.use(session(sessionConfig));
	server.use(passport.initialize());
	server.use(passport.session());
};
=======
// const express = require('express');
// const logger = require('morgan');
// const cors = require('cors');
// const helmet = require('helmet');

// module.exports = server => {
// 	server.use(logger('tiny'));
// 	server.use(cors());
// 	server.use(helmet());
// 	server.use(express.json());
// };
>>>>>>> bbc647cab5030a89c6c1774a658c37cd2f9e77a3
