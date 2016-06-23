var LocalStrategy = require('passport-local').Strategy;
var db = require('../app/models/database');
var bCrypt = require('bcrypt');

module.exports = function(passport) {
	passport.use('signup', new LocalStrategy ( {
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

        	findOrCreateSubUser = function(){	
        		Promise.all([
        			db.mainuser.findOne({
        				where: {
        					id: request.user.id
        				}
        			}),
        			db.event.findOne({
        				where: {
        					owner: request.user.id
        				}
        			})
        			]).then(function( newsub ) {
        				if (newsub) {
        					console.log('SubUser already exists with email: '+ email);
        					return done(null, false, req.flash('message','User Already Exists'));
        				} else {

        					console.log('cant find subuser, must create')

        					db.subuser.create( {
        						'email': req.param('email'),
        						'password': createHash(password),
        					} ).then(function(newsub) {
        						console.log('User Registration successful: ' + newsub.email);    
        						return done(null, newsub);
        					});
        				}
        			})				
        		}
  	 		process.nextTick(findOrCreateSubUser);
        	}
        )
	)
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}