var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/return',
    profileFields: ['id', 'name', 'displayName', 'photos', 'emails', 'events', 'cover']
  },
  function(accessToken, refreshToken, profile, cb) {
  	console.log("FACEBOOK PASSPORT")

  	// console.log(profile.events)

  	// console.log(profile._json.events)
  	console.log('###############################################################')

    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


 // events: { data: [Object], paging: [Object] } } }