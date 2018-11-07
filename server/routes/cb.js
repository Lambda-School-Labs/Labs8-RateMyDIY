const express = require('express');
const router = express.Router();
const passport = require('passport');

const model = require('../models/exampleModel');

const authenticate = require('../config/authMiddleware')

router.get('/signin', passport.authenticate('auth0', {
	scope: 'openid email profile'
  }), function (req, res) {
	res.redirect('/');
  });

  router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || '/');
      });
    })(req, res, next);
  });

router.get('/signout', (req, res) => {
	req.logout();
	res.redirect('/');
  });

router.get('/', authenticate, function(req, res, next) {
    res.status(200).json(req.user);
});

module.exports = router;