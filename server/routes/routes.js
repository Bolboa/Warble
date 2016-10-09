var path = require('path');
var User = require('../models/user');
var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(app, passport) {
	

	app.get('/', function(req, res){
		res.sendFile(path.resolve('public/index.html'));
	});
	app.get('/main', function(req, res) {
		res.sendFile(path.resolve('public/login.html'));
	});



	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('register', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done) {
		
		process.nextTick(function(){

		//find user in DB with this username
			User.findOne({'username': username}, function(err, user) {

				if (err) {

					console.log("Error in registration: " + err);
				}
				//If user already exists in DB
				if (user) {
					console.log("User already exists");
					return done(null, false, req.flash('message', 'User Already Exists'));
				}
				else {

					//if user does not exist, create it
					var newUser = new User();

					newUser.username = username;
					
					newUser.password = newUser.generateHash(password);
					//console.log("hgeeer");
					//save the user
					newUser.save(function(err) {
						
						if (err) {
							console.log('Error in Saving user: '+err);  
             	 			throw err;
						}
						console.log("User Registered");
						return done(null, newUser);
					});
				}
				
			})
		})
	}));

	app.post('/',
  passport.authenticate('register', { successRedirect: '/main',
                                   failureRedirect: '/',
                                   failureFlash: true })
);


	

	
}
