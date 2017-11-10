# MyPond
An example of a node.js/express/mongodb/mongoose web application.  The purpose is document the animals seen in my pond.  This is still a under construction.

## React Front-End

The React front-end is in /client.  I used create-react-app to get started. I had created the backend first, so I had to do some modifications to the backend to make this work.

## Node.js and Express

The routes are in the /routes directory.  Currently I am just filling in data for the animals that are in ponds in Oregon.

## Mongo

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
