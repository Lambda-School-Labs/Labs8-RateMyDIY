const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Rate-My-DIY' });
});

router.get('/test', function (req, res, next) {
    console.log(req.user);
    res.status(200).json({ message: 'success' });
})

module.exports = router;