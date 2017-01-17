var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var app = express();
var passport = require("passport");
var Strategy = require("passport-facebook").Strategy;


var PORT = process.env.PORT || 8080;


// Connection pending JawsDB or use of Mongo DB??
// Connection Info for MySQL DB ??
var connection = mysql.createConnection({
  port: 3306,
  host: "",
  user: "",
  password: "",
  database: ""
});

// Connect to MySQL DB
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Passport / Facebook Authentication Information
passport.use(new Strategy({
  clientID: process.env.CLIENT_ID || "988726484566421",
  clientSecret: process.env.CLIENT_SECRET || "088c94113e7b633bebdb6947ad2d36ae",
  callbackURL: "http://localhost:3002/login/facebook/return"
},
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user"s Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application"s database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
//
// If the above doesn"t make sense... don"t worry. I just copied and pasted too.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new express application.


// Incorporated a variety of Express packages.
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

// Here we start our Passport process and initiate the storage of sessions (i.e. closing browser maintains user)
app.use(passport.initialize());
app.use(passport.session());


// Routes
// =============================================================

// View the Main Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// View the Login Page
app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Initiate the Facebook Authentication
app.get("/user", passport.authenticate("facebook"));

// Initiate the Facebook Authentication
app.get("/washer", passport.authenticate("facebook"));

// When Facebook is done, it uses the below route to determine where to go
app.get("/login/facebook/return",
  passport.authenticate("facebook", { failureRedirect: "/user" }),

  function(req, res) {
    res.redirect("/");
  });

// This page is available for viewing a hello message
app.get("/inbox",
  require("connect-ensure-login").ensureLoggedIn(),
  function(req, res) {

    res.sendFile(path.join(__dirname, "inbox.html"));

  });

// This route is available for retrieving the information associated with the authentication method
app.get("/api/inbox",
  require("connect-ensure-login").ensureLoggedIn(),
  function(req, res) {

    var queryString = "SELECT * FROM table_of_users WHERE user_id=" + req.user.id;
    connection.query(queryString, function(err, data) {

      if(err) throw err

      if (data.length == 0) { 

        console.log("HEY");
        // INSERT INTO actors (name, coolness_points, attitude) VALUES ("Jerry", 90, "relaxed")
        var paramsToInsert = "'" + req.user.id + "'" + "," + "'" + req.user.displayName + "'" + "," + "'" + "You have no mail. You may want to make some friends." + "'"
        var insertString = "INSERT INTO table_of_users(user_id, name, mail) VALUES (" + paramsToInsert + ")";

        console.log(insertString);
        connection.query(insertString, function(err, data){

            if(err) throw err
        })


app.use(express.static('app/public'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());


//require('./app/routing/api-routes.js')(app); 

require ('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);

 
app.listen(PORT,function(){
  console.log("MyFoodCache App is running on Port: "+PORT);
});