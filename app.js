var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var empty = require('is-empty');

app.use(bodyParser.json());


Animals = require('./models/animals');
Wildlife = require('./models/wildlife');

// Connect to mongoose
mongoose.connect('mongodb://localhost/mypond', {
  useMongoClient: true,
  /* other options */
});
var db = mongoose.connection;

app.get('/', function (req, res){
  res.send("To access my pond's wildlife log use /mypond/wildlife or /mypond/animals");
});


// Animals

app.get('/mypond/animals', function(req, res){
  Animals.getAnimals(function(err, animals){
    if (err) {
      throw (err);
    }
    //res.json(animals);
    res.json(animals);
  });
});

// Find animal by name
app.get('/mypond/animals/:name', function(req, res){
  Animals.getAnimalByName(req.params.name, function(err, animal){
    //console.log("Get " + req.params.name);
    if (err) {
      throw (err);
    }

    if (empty(animal)) {
      res.status(404).json({
        message: 'Animal with name ' + req.params.name + ' was not found.'
      });
    } else {
      res.json(animal);
    }

  });
});

// Add an animal
app.post('/mypond/animals', function(req, res){
  var animal = req.body;
  Animals.addAnimal(animal, function(err, animal){
    if (err) {
      throw (err);
    }
    //res.json(animals);
    res.json(animal);
  });
});

// Update an animal record
app.put('/mypond/animals/:_id', function(req, res){
  var id = req.params._id;
  var animal = req.body;
  Animals.updateAnimal(id, animal, {}, function(err, animal){
    if (err) {
      throw (err);
    }
    res.json(animal);
  });
});

// Delete an animal
app.delete('/mypond/animals/:_id', function(req, res){
  var id = req.params._id;
  Animals.deleteAnimal(id, function(err, animal){
    if (err) {
      throw (err);
    }
    res.json(animal);
  });
});

// Wildlife

app.get('mypond/wildlife', function(req, res){
  Wildlife.getWildlife(function(err, wildlife) {
    if (err) {
      throw (err);
    }
    // show wildlife log
    res.json(wildlife);
  });

});

app.listen(3000);
console.log('Running on port 3000');
