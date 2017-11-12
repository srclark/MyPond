var express = require('express');
var router = express.Router();
var basePath = process.env.PWD;

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('home', { expressFlash: req.flash('success')});
});

module.exports = router;
