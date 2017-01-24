// =============================================================
// DEPENDENCIES
// =============================================================
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("passport");
var Strategy = require("passport-facebook").Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// Database configuration
var mongoose = require("mongoose");
var logger = require("morgan");
 
passport.use(new GoogleStrategy({
    clientID:     "514893017557-0rbdhgs517g1m4d3c86vablmkjd6f0vs.apps.googleusercontent.com",
    clientSecret: "bjTkzbL1QLsjR0FfACCWcA-1",
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, cb) {
   
    return cb(null, profile);
   
  }
));

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID || "249143522177082",
  clientSecret: process.env.CLIENT_SECRET || "4ed1e5f4b50c4edd504300f35d9b094a",
  callbackURL: "http://localhost:4000/auth/facebook/callback",
  profileFields: ["id", "displayName", "photos", "email"]
},
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// =============================================================
// GLOBAL VARIABLES
// =============================================================
var PORT = process.env.PORT || 4000;
var app = express();

// =============================================================
// USE A STATIC ADDRESS FOR LOCAL PACKAGES
// =============================================================
app.use(express.static(process.cwd() + "/public"));

// =============================================================
// USE MIDDLEWARE
// =============================================================
app.set("views", __dirname + "/views");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));
app.use(methodOverride());

// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");

mongoose.Promise = Promise;

var User = require("./schemas/userSchema.js");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Incorporated a variety of Express packages.
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

// Here we start our Passport process and initiate the storage of sessions (i.e. closing browser maintains user)
app.use(passport.initialize());
app.use(passport.session());

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/myFoodCache");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// =============================================================
// ROUTES
// =============================================================
// Initiate the Facebook Authentication

app.get("/auth/facebook", passport.authenticate("facebook"));

// When Facebook is done, it uses the below route to determine where to go
app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/home" }),

  function(req, res) {
    res.redirect("/pantry");
});

app.get('/pantry',require("connect-ensure-login").ensureLoggedIn(), function(req, res) {

    //Facebook Values And Google Values
    console.log("name: " + req.user.displayName);
    console.log("photo: " + req.user.photos[0].value);
    console.log("id: " + req.user.id);

    

    var array=["Chicke", "Garlic", "Tomatos"];

    res.render('pantry', {layout: 'pantryMain.handlebars'});
});
  
app.get('/auth/google',
  passport.authenticate('google', { scope: 
    [ 'https://www.googleapis.com/auth/plus.login' ] }
));
 
app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/pantry',
        failureRedirect: '/home'
}));

app.get('/logout', function(req, res) {
    console.log("logged out!");
    req.logout();
    res.redirect('/home');
});

var routes = require("./controllers/foodCache_controller.js");
app.use('/', routes);

// =============================================================
// LISTENING
// =============================================================
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
