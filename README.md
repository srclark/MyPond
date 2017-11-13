# MyPond
An example of a node.js/express/mongodb/mongoose web application.  The purpose is document the animals seen in my pond.  This is still a under construction.

## Handlebars Templating

I have some very rough handlebars templating in place.  

## Node.js and Express

The routes are in the /routes directory.  Currently I am just filling in data for the animals that are in ponds in Oregon.

## Mongo

You can use the instructions https://treehouse.github.io/installation-guides/mac/mongo-mac.html to install a mongodb (I have a Mac).  Make sure you create the /data/db directory.  

In the mongo shell, you just enter ```use mypond``` to create the database.  I added 2 collections, ```db.createCollection("animals")``` and ```db.createCollection("wildlife")```.  If you want to verify that everything is correct, check the databases with ```show dbs``` and ```show collections```.  You should see a database called mypond and you should see 2 collections, animals and wildlife.

The models for the db are in the models/ directory.  I have 2 collections animals for all the possible animals and wildlife for a log of wildlife sightings.  The wildlife schema is not well defined yet.  The animal schema is much farther along.

```// Animals Schema
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
  },
  animal_desc: {
    type: String,
    required: false
  }
});
