var express = require("express");
var router = express.Router();
var path = require("path");
var formidable = require("formidable");
var fs = require("fs");
var partials = require("express-partials");
var util = require("util");
var methodOverride = require("method-override");

var foodCache = require("../models/foodCache.js");

router.get("/", function (req, res) {
	res.redirect("/home");
});

router.get("/home", function(req, res) {

  res.render("home");

});

//API 
router.get("/api/recipes", function(req, res) {

	console.log(res);

});


module.exports = router;