const express = require('express');
var router = express.Router();
var db = require('../app/models/database');


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
		console.log("##### HOME PAGE #####")
		console.log(req.user.dataValues)
		console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$############################")

	db.event.findAll({ 
			where: {
				mainuserId: req.user.dataValues.id
			}
			}).then(function (event) {
				console.log(event)
				res.render('home', { user: req.user })
			})
		// res.render('home', { user: req.user });
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
		console.log("button is working")
 
		facebook.api( '/me/events?fields=name,id,is_viewer_admin,owner,cover,place,start_time', function(err, res) {
			if(!res || res.error) {
				console.log(!res ? 'error occurred' : res.error);
				return;
			}
			for (var i = 0; i < res.data.length; i++) {
				if (res.data[i].is_viewer_admin) {
					var theevent = res.data[i]
					db.mainuser.findOne({
						where: {
							fbid: req.user.id 
						}
					}).then(function(theuser){
						theuser.createEvent({
							'name': theevent.name,
							'fbid': theevent.id
						})
					})
				}
			}

        	console.log("The data is STORED")
			// db.event.create({
   //              'firstname': req.param('firstname'),
   //              'lastname': req.param('lastname'),
   //              'organisation': req.param('organisation'),
   //              'email': req.param('email'),
   //          	'username': username,
   //          	'password': createHash(password),
   //              'telephone': req.param('telephone'),
   //              'location': req.param('location')
   //          }).then(function() {
   //          	console.log("The data is STORED")
   //              res.redirect('/home');
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

	// // PROFILE FB
	// router.get('/profile',
	//     require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
	//     	var FBdata = {}

	//         console.log("############### profile loaded ###################")

	//         facebook.setAccessToken(req.user.accessToken)

	//         facebook.api( '/me/events?fields=admins,attending', function(err, res) {
	//             if(!res || res.error) {
	//                 console.log(!res ? 'error occurred' : res.error);
	//                 return;
	//             }
	//             console.log(res)
	//             FBdata.event = res
	//         });
	//         console.log(FBdata)
	//         res.render('profile', { 
	//         	user: req.user,
	//         	event: FBdata.event
	//         });
	//     });


return router;
}




