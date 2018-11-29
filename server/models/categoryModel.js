const db = require('../config/dbConfig');

module.exports = {
	addCategory,
	editCategory,
};

function addCategory(user_id, project_id, category) {
	return db('projects')
		.where({ user_id, project_id })
		.first()
		.then(project => {
			if (project) {
				return db('categories')
					.returning('category_id')
					.insert({ ...category, project_id })
					.then(([id]) => {
						if (id) {
							return db('projects')
								.where({ project_id })
								.update({ last_updated: db.fn.now() })
								.then(() => id);
						}
					});
			} else return undefined; // no project by that id || wrong author
		});
}

// I feel like this could be more elegant.
function editCategory(user_id, project_id, post_id, changes) {
	return db('projects')
		.where({ user_id, project_id })
		.first()
		.then(post => {
			if (post) {
				return db('posts')
					.where({ project_id, post_id })
					.returning('post_id')
					.update(changes)
					.then(ids => ids.length)
					.then(count => {
						if (count) {
							return db('projects')
								.where({ project_id })
								.returning('project_id')
								.update({ last_updated: db.fn.now() })
								.then(ids => ids.length);
						} else return undefined; // no post by that id
					});
			} else return undefined; // no project by that id || wrong author
		});
}

