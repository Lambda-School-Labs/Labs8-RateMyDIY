const db = require('../config/dbConfig');
var Promise = require('bluebird');

module.exports = {
	getProjectByID,
	getReviewsByProjectID,
	addProject,
	editProject,
	removeProject
};

function getProjectByID(project_id) {
	return db('projects')
		.where({ project_id })
		.first()
		.then(project => {
			if (project) {
				return db('posts')
					.where({ project_id })
					.then(posts => ({ ...project, posts }));
			} else return undefined;
		});
}

function getReviewsByProjectID(project_id) {
	return db('projects')
		.where({ project_id })
		.first()
		.then(project => {
			if (project) {
				return db('reviews').where({ project_id });
			} else return undefined;
		});
}



function addProject (project, categories) {
	return db
		.transaction(trx => {
			return trx
				.insert(project, 'project_id')
				.into('projects')
				.then(project_id => {
					if (project_id, categories.length)
						return Promise.map(categories, category_id => {
							const project_category = { project_id, category_id };

							return trx.insert(project_category).into('project_categories');
						});
				});
		})
		.then(function(inserts) {
			console.log(
				inserts.length + ' categories added for project_id ' + project_id
			);
			return project_id;
		})
		.catch(function(error) {
			console.error(error);
		});
};


function editProject(user_id, project_id, changes) {
	return db('projects')
		.where({ user_id, project_id })
		.returning('project_id')
		.update(changes)
		.then(ids => ids.length);
}

function removeProject(user_id, project_id) {
	return db('projects')
		.where({ user_id, project_id })
		.del();
}
