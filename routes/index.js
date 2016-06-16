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

	// FACEBOOK API
	var Facebook = require('facebook-node-sdk');

	var facebook = new Facebook( { 
    appID: process.env.CLIENT_ID, 
    secret: process.env.CLIENT_SECRET 
	});

	/* GET create event Page */
	router.get('/createevent', isAuthenticated, function(req, res){
		facebook.setAccessToken(req.user.accessToken)

		facebook.api( '/me/events?fields=admins,attending', function(err, res) {
			if(!res || res.error) {
				console.log(!res ? 'error occurred' : res.error);
				return;
			}
			console.log(res)
		});
		res.redirect('/home');
	});

	// LOGIN FACEBOOK
	router.get('/login/facebook',
		passport.authenticate('facebook', {
			scope : ['public_profile', 'user_events', 'email']
		}));
	// RETURN AFTER LOGIN FB
	router.get('/login/facebook/return', 
	passport.authenticate('facebook', {
		failureRedirect: '/', 
	}),
	function(req, res) {
		res.redirect('/home');
	});

	// PROFILE FB
	router.get('/profile',
	    require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
	    	var FBdata = {}

	        console.log("############### profile loaded ###################")

	        facebook.setAccessToken(req.user.accessToken)

	        facebook.api( '/me/events?fields=admins,attending', function(err, res) {
	            if(!res || res.error) {
	                console.log(!res ? 'error occurred' : res.error);
	                return;
	            }
	            console.log(res)
	            FBdata.event = res
	        });
	        console.log(FBdata)
	        res.render('profile', { 
	        	user: req.user,
	        	event: FBdata.event
	        });
	    });


return router;
}




