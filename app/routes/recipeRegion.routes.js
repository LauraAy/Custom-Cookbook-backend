module.exports = app => {
    const regions = require("../controllers/region.controller.js");
    const recipes = require("../controllers/recipe.controller.js");
    
    var router = require("express").Router();

    //Retrieve all Regions
    router.get("/", regions.findRegionRecipes);

    app.use('/api/recipeRegions', router);
};