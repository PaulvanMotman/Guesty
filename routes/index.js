const express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
    	res.render('index', { message: req.flash('message') });
    });

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// LOGIN FACEBOOK
	router.get('/login/facebook',
		passport.authenticate('facebook', {
			scope : ['public_profile', 'user_friends', 'user_events', 'email' ]
		}));
// RETURN AFTER LOGIN FB
router.get('/login/facebook/return', 
	passport.authenticate('facebook', {
		failureRedirect: '/login/facebook' // set to login/facebook for security
	}),
	function(req, res) {
		res.redirect('/profile');
	});
// GO TO PROFILE

// FACEBOOK API ETC

var Facebook = require('facebook-node-sdk');

var facebook = new Facebook( { 
	appID: process.env.CLIENT_ID, 
	secret: process.env.CLIENT_SECRET 
});

// PROFILE FB
router.get('/profile',
	require('connect-ensure-login').ensureLoggedIn(), function(req, res) {


		console.log("############### profile loaded ###################")

		facebook.setAccessToken(req.user.accessToken)

		facebook.api( '/me/friends', function(err, res) {
			if(!res || res.error) {
				console.log(!res ? 'error occurred' : res.error);
				return;
			}
			console.log(res)
		});


		res.render('profile', { user: req.user });
	});

return router;
}




