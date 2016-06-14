const express = require('express');
const bodyParser= require('body-parser')
const pg = require('pg')
const app = express();
const bcrypt = require('bcrypt')

var Sequelize = require('sequelize');
var session = require('express-session');

/// Requiring modules
var db = require('./app/models/database')

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());

/// Setting the jade views
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public/'));

/// Declaring the session stuff??
app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

// PASSPORT FB STUFF
var passport = require('passport');
var facebook = require('./app/models/facebook')
app.use(passport.initialize());
app.use(passport.session());



/// This part tells the app to listen to a server
var server = app.listen(3000, function (){
	console.log ('Blog Application listening on: ' + server.address().port)
});
