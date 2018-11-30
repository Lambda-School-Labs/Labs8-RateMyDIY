const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn(
	'/signin'
);

const db = require('../models/categoryModel');

// add category to project by id
router.post('/', ensureLoggedIn,  function(req, res, next) {
	const { user_id, project_id, category_name } = req.body;
	console.log(req.body)
	if (!category_name) {
		return res.status(422).json({ error: 'Category cannot be empty.' });
	} else {
		const category = { category_name };
		console.log(category)
		db.addCategory(user_id, project_id, category.category_name)
			.then(category_id => {
				if (category_id) {
					res.status(201).json(category_id);
				} else {
					// 404 if project doesn't exist ?
					// 403 if project exists but user is not author
					res.status(403).json({ error: 'Not authorized.' });
				}
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
});


module.exports = router;