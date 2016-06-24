var LocalStrategy = require('passport-local').Strategy;
var db = require('../app/models/database');
var bCrypt = require('bcrypt');

module.exports = function(passport) {
	// console.log("$$$$$$$$$$ HELLOOOO signup ^^^^^^")
	
	// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
	passport.use('signup', new LocalStrategy ( {
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(request, email, password, done) {
        	console.log('HELLOOOOOOO')
        	console.log(request)
        	findOrCreateSubUser = function(){	
        		Promise.all([
        			db.mainuser.findOne({
        				where: {
        					id: request.user.id
        				}
        			}),
        			db.event.findOne({
        				where: {
      // ###################### !!!!!!!!!!!!!!! chenge these to get the event id and fbeventid so when subuser logs in 
      // he gets redirected to the dinamic event page that has the fbeventid in its URL
        					'fbeventid' :  request.params.fbeventid
        				}
        			})
        			]).then(function( newsub ) {
        			console.log("%%%% NEW SUB IN THE MAKING")	
        				if (newsub) {
        					console.log('SubUser already exists with email: '+ email);
        					return done(null, false, request.flash('message','User Already Exists'));
        				} else {

        					console.log('cant find subuser, must create')

        					db.subuser.create( {
        						'email': request.body.emailsubuser,
        			// ORIGINAL
        			// 'email': req.param('email'),
        						'password': createHash(password),
        						'fbeventidsubuser': request.params.fbeventid 
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