var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("To access my pond's wildlife log use /wildlife or use /animals for reference information");
});

module.exports = router;
