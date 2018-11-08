const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/signin');

const db = require('../models/projectsModel');

router.get('/api/projects/:id', function (req, res, next) {
    const { id } = req.params;
    db
        .getProjectByID(id)
        .then(project => {
            if (!project) {
                res.status(404).json({ error: 'Could not get project.' });
            }
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/api/projects/user/:id', function (req, res, next) {
    res.status(200).json({ user: 'project' });
});

router.post('/api/projects/add', ensureLoggedIn, function (req, res, next) {
    const project = req.body;
    if (!project.project_name) {
        return res.status(400).json({ error: 'Please provide more information.' });
    }
    db
        .addProject(project)
        .then(res => {
            res.status(201).json(res);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/api/projects/edit/:id', ensureLoggedIn, function (req, res, next) {
    const { id } = req.params;
    const changes = req.body;

    db
        .editProject(id, changes)
        .then(res => {
            res.status(200).json(res);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/api/projects/remove/:id', ensureLoggedIn, function (req, res, next) {
    const { id } = req.params;

    db
        .removeProject(id)
        .then(res => {
            res.status(200).json(res);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;