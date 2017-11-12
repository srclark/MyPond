var express = require('express');
var app = express();
//var router = express.Router();

var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var empty = require('is-empty');

var hbs = require('handlebars');
var exphbs  = require('express-handlebars');

var cookieParser = require('cookie-parser');
var session = require('express-session')
var flash = require('express-flash');

var animals = require('./routes/animals');
var wildlife = require('./routes/wildlife')
var index = require('./routes/index');

// Handlebars teplating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//app.use(cookieParser());

app.use(bodyParser.json());
// We are going to use an html form, so we need urlencoded
app.use(bodyParser.urlencoded({ extended : true }));

app.use(cookieParser('keyboard cat'));
app.use(session({
  cookie: { maxAge: 60000},
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

// Route that creates a flash message using the express-flash module
/*app.all('/express-flash', function( req, res ) {
    console.log("express-flash");
    req.flash('success', 'This is a flash message using the express-flash module.');
    res.redirect(301, '/');
});

// Route that creates a flash message using custom middleware
app.all('/session-flash', function( req, res ) {
    req.session.sessionFlash = {
        type: 'success',
        message: 'This is a flash message using custom middleware and express-session.'
    }
    res.redirect(301, '/');
}); */

// Add a UI directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/animals', animals);
app.use('/wildlife', wildlife);
app.use('/', index);


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
