const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
var cookieParser = require('cookie-parser');

module.exports = server => {
	server.use(logger('tiny'));
	server.use(cors());
	server.use(helmet());
	server.use(express.json());
	server.use(cookieParser());
};
