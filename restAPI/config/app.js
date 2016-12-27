var path = require('path');
var LocalStrategy   = require('passport-local').Strategy;
var moment = require('moment');

//schema model for user
var User = require('../models/user');

//received fully configured routes and passport
module.exports = function(app, router, passport, jwt) {
	//set a secret string to be encoded in JWT
	app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');
	
	//called on every authenticated request to recover user account from database,
	//normally it is stored in the session or a cookie but this app bypasses the sessions/cookies,
	//instead JWT are used to authenticate an account
	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //deserializes the user.id that was stored to the session through serializeUser(),
    //uses a lookup function to search for the user in the mongo database,
    //again it is not being used because JWT is being implemented instead
    passport.deserializeUser(function(id, done) {
    	//searches database
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    /*----------REGISTERS USER-----------*/
    passport.use('register', new LocalStrategy({
    	usernameField:'username',
    	passwordField:'password',
    	//allows the entire request to be passed to the callback
		passReqToCallback : true 
	},
	//pass username and password fields to the main function
	function(req, username, password, done) {
		//delays the callback until the next tick in the event loop
		process.nextTick(function(){
			//find the user in the database with the matching username
			User.findOne({'username': username}, function(err, user) {
				//throws error if search fails
				if (err) {
					console.log("Error in registration: " + err);
				}
				//if the user is found then the user already exists and an error message is returned
				if (user) {
					return done("Username already in use", false, req.flash('message', 'User Already Exists'));
				}
				//if the user does not already exist in the database, it is created
				else {
					//create a new schema for the user
					var newUser = new User();
					//append a username to the user model
					newUser.username = username;
					//appends an encrypted password to the user model
					newUser.password = newUser.generateHash(password);
					//the user model is saved to the database
					newUser.save(function(err) {
						//throws error if the user cannot be saved
						if (err) {
							console.log('Error in Saving user: '+err);  
             	 			throw err;
						}
						//returns user model if the user was saved successfully
						return done(null, newUser);
					});
				}
			})
		})
	}));

    /*----------AUTHENTICATES USER FOR LOGIN-----------*/
    passport.use('local-login', new LocalStrategy({
    	usernameField:'username',
    	passwordField:'password',
    	//allows the entire request to be passed to the callback
    	passReqToCallback: true
    },
    //pass username and password fields to the main function
    function(req, username, password, done) {
    	 //check to see if the user trying to login already exists in the database
    	 User.findOne({'username': username}, function(err, user) {
    	 	//if there are any errors, return the error before anything else
            if (err)
                return done(err);
            //if the username is not found, return an error message
            if (!user)
            	return done("Username does not exist", false, req.flash('loginMessage', 'No user found.'));
            // if the user is found but the password is wrong, return an error message
            if (!user.validPassword(password))
            	return done("Password does not match username", false, req.flash('loginMessage', 'Oops! Wrong password.'));
            //returns user model if the user was saved successfully
            return done(null, user);
    	 })
    }));

    /*-----CONFIGURES ROUTES------*/
    router.use(function(req, res, next) {
    	//go to the next routes
    	next(); 
	});

    /*------TEST REQUEST FOR API------*/
	router.get('/', function(req, res) {
    	res.json({ message: 'hooray! welcome to our api!' });
	});

	/*-------REQUEST TO REGIRSTER USER---------*/
	router.route('/register')
		.post(function(req, res, next) {
			//calls register function
			passport.authenticate('register', function(err, user, info) {
				//if there is an error, return the error the front-end
				if (err) {
					return res.json({error:err});
				}
				//otherwise return a success statement
				else {
					res.json({success:true});
				}
			})(req, res, next)
		});

	/*-----REQUEST TO AUTHENTICATE USER LOGIN-----*/
	router.route('/login')
		.post(function(req, res, next) {
			//call login function
			passport.authenticate('local-login', function(err, user, info) {
				//if there is an error, return the error the front-end
				if (err) {
					return res.json({ error: err });
				}
				//if there user is null but for some reason no error was thrown, return error (null) to the front-end	
				if (!user) {
					return res.json({ error: err });
				}
				
				//expiry date of JWT, which is set to one week
				var expires = moment().add('days', 7).valueOf();
				//create a token encrypted using the JWT secret
				var token = jwt.encode({
  					iss: user.username,
  					exp: expires
				}, app.get('jwtTokenSecret'));
        		
        		//return the JWT along with the user's username to the front-end,
        		//it will be stored to user's local storage
        		res.json({
        			token: token,
        			username:user.username
        		})

        		//login successful
        		return true;
			})(req, res, next)
		});

	/*-------DECODE USER TOKEN--------*/
	router.route('/decode')
		.post(function(req, res) {
			//encrypted JWT
			var token = req.body.token;
			//if encrypted JWT is not null
			if (token) {
				//decode the encrypted JWT using the JWT secret 
		  		try {
		    		var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
		    		//if successful send a success message to the front-end
		    		res.json({
        				auth: true
        			})
		    	//encrypted JWT cannot be decrypted
		  		} catch (err) {
		    		console.log(err);
		  		}
		  	//encrypted JWT is null
			} else {
		  		console.log("token does not exist");
			}
		});
}
