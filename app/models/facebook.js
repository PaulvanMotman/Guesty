var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL: 'http://localhost:3000/login/facebook/return',
   profileFields: ['id', 'name', 'displayName', 'photos', 'events', 'emails']
 },
 function(accessToken, refreshToken, profile, cb) {
     console.log("#### PASSPORT FACEBOOK ####")
     // console.log(profile._json.events)
     console.log('########### AccessToken ################')
   console.log(accessToken)
   console.log("#### END ####")

   profile.accessToken = accessToken;

   return cb(null, profile);
 }));

passport.serializeUser(function(user, cb) {
 cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
 cb(null, obj);
});


// events: { data: [Object], paging: [Object] } } }