const db = require('../config/dbConfig');

module.exports = {
    getProjectByID,
    addProject,
    editProject,
    removeProject,
};

function getProjectByID(id) {
    return db('projects')
        .where({ project_id: id })
        .first();
}

function addProject(project) {
    return db('projects')
        .insert(project)
        .into('projects');
}

function editProject(id, changes) {
    return db('projects')
        .where({ project_id: id })
        .update(changes);
}

function removeProject(id) {
    return db('projects')
        .where({ project_id: id })
        .del();
}