var express = require('express');
var secured = require('../config/secured');
var router = express.Router();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.json({
    _json
  });
});

module.exports = router;