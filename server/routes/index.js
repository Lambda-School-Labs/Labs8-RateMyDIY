const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Rate-My-DIY' });
});

module.exports = router;