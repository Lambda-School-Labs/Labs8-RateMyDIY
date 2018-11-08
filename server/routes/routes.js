const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

const db = require('../models/usersModel');

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
      res.redirect(returnTo || '/test');
    });
  })(req, res, next);
});

router.get('/signout', (req, res) => {
	req.logout();
	res.redirect('/');
  });

router.get('/test', ensureLoggedIn, function (req, res, next) {
    // console.log(req.user);
    console.log(req.user.app_metadata);
    let sub = req.user._json.sub.split('|');
    let userID = sub[1];
    let nickname = req.user._json.nickname;
    let user = {
        userID,
        nickname
    }
    db
        .createUser(user)
        .then(ids => {
            console.log(ids);
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;