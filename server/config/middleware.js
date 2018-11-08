const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const strategy = require('../setup-passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const sessionConfig = {
    secret: 'TKd8^S$W-HPS3NtF', // .env file
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
