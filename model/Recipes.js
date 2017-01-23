var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    idRecipe: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },

    title: {
        type: String
    },
    url: {
        type: String
    },
    thumbnail: {
    	type: String
    },
    ingredients: {
    	type: Array,
        default: []
    }
});

var Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;