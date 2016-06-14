var LocalStrategy = require('passport-local').Strategy;
var db = require('../app/models/database');
var bCrypt = require('bcrypt');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

        	findOrCreateUser = function(){
        		db.mainuser.find({ where: {'username' :  username }}).then(function(user) {
                    // already exists
                    if (user) {
                    	console.log('User already exists with username: '+ username);
                    	return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        console.log('cant find user, must create')

                        // save the user
                        db.mainuser.create({
                            'firstname': req.param('firstname'),
                            'lastname': req.param('lastname'),
                            'organisation': req.param('organisation'),
                            'email': req.param('email'),
                        	'username': username,
                        	'password': createHash(password),
                            'telephone': req.param('telephone'),
                            'location': req.param('location')
                        }).then(function(user) {
                        	console.log('User Registration successful: ' + user.username);    
                        	return done(null, user);
                        });
                    }
                });
        	};

        	process.nextTick(findOrCreateUser);
        })
    );
    // Generates hash using bCrypt
    var createHash = function(password){
    	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}