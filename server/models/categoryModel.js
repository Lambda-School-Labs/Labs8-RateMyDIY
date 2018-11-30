const db = require('../config/dbConfig');

module.exports = {
	addCategory,
};

function addCategory(user_id, project_id, category) {
	return db('projects')
		.where({ user_id, project_id })
		.first()
		.then(project => {
			if (project) {
				return db('project_categories')
					.returning('category_id')
					.insert({project_id , category_id:category})
					.then(id => {
						return id;
					})
					// .then(([id]) => {
					// 	if (id) {
					// 		return db('projects')
					// 			.where({ project_id })
					// 			.update({ last_updated: db.fn.now() })
					// 			.then(() => id);
					// 	}
					// });
			} else return undefined; 
		});
}




