var express = require("express");
var router = express.Router();
var path = require("path");
var formidable = require("formidable");
var fs = require("fs");
var partials = require("express-partials");
var util = require("util");
var methodOverride = require("method-override");
var request = require ("request");


var foodCache = require("../models/foodCache.js");

router.get("/", function (req, res) {
    res.redirect("/home");
});

router.get("/home", function(req, res) {

  res.render("home");

});


router.post("/api", function(req, res) {

	console.log(req.body);

    var matchData = [];

//Add the query values below
    var userQuery = req.body.searchQuery;
//_____________________________________________________

    var ApiQuery = 'http://www.recipepuppy.com/api/?i='+ userQuery
    request(ApiQuery, function (error, response, body) {
      if (!error && response.statusCode == 200) {
                var data = JSON.parse(body)
              var dataRes = data.results;

              for (var i = 0; i < dataRes.length; i++) {

                var reqIngredients = userQuery.split(",");
                var resIngredients = dataRes[i].ingredients.split(",");
                var counter = 0

                for (var j = 0; j < resIngredients.length; j++) {
                    var ingredient = resIngredients[j].trim();

                    for (var w = 0; w < reqIngredients.length; w++) {
                              if (ingredient==reqIngredients[w]) {
                      counter++
                      }
                    }
                }
                    var matchPerctage = Math.floor((counter / resIngredients.length)*100)
                    console.log(matchPerctage);
                    //changer match percentage value below for better reciepe accuracy
                if (matchPerctage>=20) {
                  matchData.push(dataRes[i]);
                }
              }

              	console.log(matchData);
                res.send(matchData);
          }
        })
    });	


module.exports = router;