var express = require('express');
var app = express();
//var router = express.Router();

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var empty = require('is-empty');

var animals = require('./routes/animals');
var wildlife = require('./routes/wildlife')
var index = require('./routes/index');

app.use(bodyParser.json());
app.use('/animals', animals);
app.use('/wildlife', wildlife);
app.use('/', index)

Animals = require('./models/animals');
Wildlife = require('./models/wildlife');

// Connect to mongoose
mongoose.connect('mongodb://localhost/mypond', {
  useMongoClient: true,
  /* other options */
});
var db = mongoose.connection;

module.exports = app;


//app.listen(3001);
console.log('Running on port 3001');
