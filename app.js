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

/// This part renders the landing page

// LANDING
app.get('/',
  function(req, res) {
    res.render('index', { user: req.user });
  });
// LOGIN LOCALLY
app.get('/login',
  function(req, res){
    res.render('login');
  });
// REGISTER LOCALLY
app.get('/register', (req, res) => {
	res.render("register")
})
// LOGIN FACEBOOK
app.get('/login/facebook',
  passport.authenticate('facebook'));
// RETURN AFTER LOGIN FB
app.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });
// GO TO PROFILE
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
  	console.log(req.user)
    res.render('profile', { user: req.user });
  });

/// This part renders the register page

app.post('/register', (req, res) => {
	bcrypt.hash(req.body.password, 9, function(err, hash) {
		if (err) {
			return err
		}
		else {
			db.mainuser.create({
				firstname: req.body.firstname,
				lastname: req.body.lastname,				
				organisation: req.body.organisation,
				email: req.body.email,
				username: req.body.username,
				password: hash,
				telephone: req.body.telephone,
				location: req.body.location
			})
		}
	})
	res.redirect('/')
})



/// This part tells the app to listen to a server
var server = app.listen(3000, function (){
        console.log ('Blog Application listening on: ' + server.address().port)
});
