var express = require('express');
var router = express.Router();
var empty = require('is-empty');


// Animals

router.get('/', function(req, res){
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
router.get('/:name', function(req, res){
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
router.post('/', function(req, res){
  var animal = req.body;
  Animals.addAnimal(animals, function(err, animal){
    if (err) {
      return next(err);
    }

    if (empty(animal)) {
      res.status(200).send("No animals found in database");
    } else {
     res.json(animals);
   }
  });
});

// Update an animal record
router.put('/:_id', function(req, res){
  var id = req.params._id;
  var animal = req.body;
  console.log(animal);
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
router.delete('/:_id', function(req, res){
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
