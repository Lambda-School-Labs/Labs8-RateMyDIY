const db = require('../config/dbConfig');

module.exports = {
    getProjects,
    getProjectByID,
    createProject,
    editProject,
    removeProject,
};

function getProjects() {
    return db('projects');
}

function getProjectByID(project_id) {
    return db('projects')
        .where({ project_id })
        .first();
}

function createProject(project) {
    return db('projects')
        .insert(project)
        .into('projects');
}

function editProject(project_id, changes) {
    return db('projects')
        .where({ project_id })
        .update(changes);
}

function removeProject(project_id) {
    return db('projects')
        .where({ project_id })
        .del();
}