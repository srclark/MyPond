var express = require('express');
var router = express.Router();
var empty = require('is-empty');


// Wildlife

router.get('/', function(req, res, next){
  console.log("Get Wildlife");
  Wildlife.getWildlife(function(err, wildlife){
    if (err) {
      return next(err);
    }
    if (empty(wildlife)) {
      res.status(200).send("No wildlife found in database");
    } else {
      // show wildlife log
      res.json(wildlife);
    }
  });
});

module.exports = router;
