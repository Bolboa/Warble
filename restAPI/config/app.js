var path = require('path');
var User = require('../models/user');
var LocalStrategy   = require('passport-local').Strategy;
var moment = require('moment');

module.exports = function(app, router, passport, jwt) {
	
	app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');



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
    	usernameField:'username',
    	passwordField:'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
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

    passport.use('local-login', new LocalStrategy({
    	usernameField:'username',
    	passwordField:'password',
    	passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
    	console.log(password + "here");
    	 // we are checking to see if the user trying to login already exists
    	 User.findOne({'username': username}, function(err, user){
    	 	// if there are any errors, return the error before anything else
    	 	console.log(password);
            if (err)
                return done(err);
            if (!user)
            	return done(null, false, req.flash('loginMessage', 'No user found.'));
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
            	return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user);

    	 })
    }));

    //app.use(cors());

    router.use(function(req, res, next) {
    // do logging
    
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

 router.options("*",function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

router.route('/register')
	.post(function(req, res, next) {
		//console.log(req.body.username);
		passport.authenticate('register', function(err, user, info){
			console.log("authenticate");
        	console.log(err);
        	console.log(user);
        	console.log(info);
		})(req, res, next)
});

router.route('/login')
	.post(function(req, res, next) {
		console.log(req.body);
		passport.authenticate('local-login', function(err, user, info){
			console.log("authenticate");
			if (err) {return next(err)}
			if (!user) {
				return res.json(401, { error: 'message' });
			}
			var expires = moment().add('days', 7).valueOf();
			var token = jwt.encode({
  				iss: user.username,
  				exp: expires
			}, app.get('jwtTokenSecret'));
        	//console.log(err);
        	console.log(token + "this token");
        	//console.log(info);
		})(req, res, next)
});
	
	
}
