var express = require('express');
var router = express.Router();
var empty = require('is-empty');
var validUrl = require('valid-url');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


// Animals

router.get('/', function(req, res, next){
  console.log("Get Animals");
  Animals.getAnimals(function(err, animals){
    if (err) {
      return next(err);
    }
    //res.json(animals);
    res.json(animals);

  });
});

// Find animal by name
router.get('/:name', function(req, res, next){
  Animals.getAnimalByName(req.params.name, function(err, animal){
    //console.log("Get " + req.params.name);
    if (err) {
      return next(err);
    }

    if (empty(animal)) {
      res.status(404).send('Animal with name ' + req.params.name + ' was not found.');
    } else {
      res.json(animal);
    }

  });
});

// Add an animal
router.post('/', [
  check('name', 'Name must be between 3 and 180 alphabetic characters')
    .isLength({min: 3, max: 128}),

  sanitize('name').trim(),
  sanitize('name').escape(),
  sanitize('animal_desc').trim(),
  sanitize('animal_desc').escape()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var errMsg = 'Error: ' + errors.mapped().name.msg;

    req.flash('success', errMsg)
    return res.redirect(301, '/');

    //res.status(422).send({ errors: errors.mapped() });
  }
  //function(req, res, next) {
  var animal = req.body;
  animal.name = animal.name.trim();

  // animal empty: Probably not needed anymore
  if (empty(animal)) {
    res.status(400).send("No animals added to database");
  } else {

    // Validate picture url
    var dataErr = empty(animal.picture_url) || validUrl.isUri(animal.picture_url) ? '' : "Picture link is not valid. " ;

    if (empty(dataErr)) {
      console.log("Post: ", req.body.name);
      Animals.addAnimal(animal, function(err, animal) {
        if (err) {
          return next(err);
        }

       //res.json(animal);
       var successMsg = 'Success! ' + req.body.name + ' added!';
       req.flash('success', successMsg);
       res.redirect('/');
       //res.redirect('/animals/' + animal.name);
     });
    } else {
      console.log(dataErr);
      req.flash('success', 'Error: ' + dataErr)
      res.redirect(301, '/');

      //res.status(400).send(dataErr);
    }
 }
});

// Update an animal record
router.put('/:_id', function(req, res, next){
  var id = req.params._id;
  var animal = req.body;

  Animals.updateAnimal(id, animal, {}, function(err, animal){
    if (err) {
      return next(err);
    }
    if (empty(animal)) {
      res.status(404).send('Update Failed: Animal with id ' + req.params.id + ' was not found.');
    } else {
      res.json(animal);
    }
  });
});

// Delete an animal
router.delete('/:_id', function(req, res, next){
  var id = req.params._id;
  Animals.deleteAnimal(id, function(err, animal){
    if (err) {
      return next(err);
    }
    if (empty(animal)) {
      res.status(404).send('Delete failed: Animal with id ' + req.params.id + ' was not found.');
    } else {
      res.json(animal);
    }
  });
});

module.exports = router;
