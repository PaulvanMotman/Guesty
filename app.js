const express = require('express');
const bodyParser= require('body-parser')
const pg = require('pg')
const app = express();
const bcrypt = require('bcrypt')

var passport = require('passport');
var Sequelize = require('sequelize');
var session = require('express-session');

// port for heroku to connect
var port = process.env.PORT || 8080;

// Requiring modules
var db = require('./app/models/database')

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());

/// Setting the view engine pug
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public/'));

// Reddis to store the session
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

// initialize authentication and sessions
if (process.env.REDIS_URL) {
app.use(session({
	secret: 'secret no, more the just a secret', 
	resave: false, 
	saveUninitialized: false,
	// using redis for session storage here. if no redis server available, change 'store' to use another sessionstore.
	store: new RedisStore({
		url: process.env.REDIS_URL
	}) 
}));
} else { app.use(session({
		secret: 'oh wow very secret much security',
		resave: true,
		saveUninitialized: false
	}));
}

// Declaring the passport stuff
var passport = require('passport');
var facebook = require('./app/models/facebook')
app.use(passport.initialize());
app.use(passport.session());

var initPassport = require('./passport/init');
initPassport(passport);

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());


// Initialize Router
var routes = require('./routes/index')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// ############# FACEBOOK API CALL ####################
// Using require() in ES5



// ############# GUESTY API CALL ######################





/// This part tells the app to listen to a server
var server = app.listen(port, function (){
	console.log ('Blog Application listening on: ' + server.address().port)
});
