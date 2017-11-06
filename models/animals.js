var mongoose = require('mongoose');

// Animals Schema
var animalsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  animal_type: {
    type: String,
    required: true,
    default: 'bird'
  },
  picture_url: {
    type: String,
    required: false
  }
});

var Animals = module.exports = mongoose.model('Animals', animalsSchema);

// Get Animals
module.exports.getAnimals = function(callback, limit){
  Animals.find(callback).limit(limit);
};

// Get Animal
module.exports.getAnimalByName  = function(animal, callback){
  Animals.find({name: animal}, callback);
};

// Add Animal
module.exports.addAnimal = function(animal, callback){
  Animals.create(animal, callback);
};

// Update Animal
module.exports.updateAnimal = function(id, animal, options, callback){
  var query = {_id: id};
  var update = { $set: {
    name: animal.name,
    animal_type: animal.animal_type,
    picture_url: animal.picture_url
  }};
  Animals.findOneAndUpdate(query, update, options, callback);

  //console.log(animal);
};

// Delete Animal
module.exports.deleteAnimal = function(id, callback){
  var query = {_id: id};
  Animals.remove(query, callback);
};
