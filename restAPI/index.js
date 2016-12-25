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

mongoose.connect('mongodb://Savage Tekk:2savages@ds061506.mlab.com:61506/user');
var db = mongoose.connection;


// require('./config/passport')(passport); // pass passport for configuration
var router = express.Router();
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

//app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// required for passport

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//app.use(cors());
// routes ======================================================================


require('./config/app.js')(app, router, passport, jwt); // load our routes and pass in our app and fully configured passport



app.use('/api', router);
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);