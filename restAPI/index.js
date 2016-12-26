var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var jwt = require('jwt-simple');
var session = require('express-session');

//connect to MongoLab database
mongoose.connect('mongodb://Savage Tekk:2savages@ds061506.mlab.com:61506/user');

//sets up routes for server requests
var router = express.Router();

// log every request to the console
app.use(morgan('dev'));

//sets necessary headers for server requests
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

//body parser to read json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//sets the session secret
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
//initialize Passport.js
app.use(passport.initialize());
//persistent login sessions
app.use(passport.session()); 
//use connect-flash for flash messages stored in session (throws error messages in console)
app.use(flash()); 

//load our routes and pass in our app and fully configured passport
require('./config/app.js')(app, router, passport, jwt); 

//route to check if API is working
app.use('/api', router);

//launch API
app.listen(port);
console.log('The magic happens on port ' + port);