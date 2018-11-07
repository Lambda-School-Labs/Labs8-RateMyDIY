const db = require('../config/dbConfig');

module.exports = {
	getUsers,
	createUser,
};

function getUsers() {
	return db('users');
}

function createUser(user) {
	const { userID, nickname } = user;
	db('users').insert(userID).into('users');
}
