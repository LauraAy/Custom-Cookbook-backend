module.exports = app => {
    const regions = require("../controllers/region.controller.js");
    const recipes = require("../controllers/recipe.controller.js");
    
    var router = require("express").Router();

    //Create a new Region
    router.post("/", regions.create);

    //Retrieve all Regions
    router.get("/", recipes.findAll);

    app.use('/api/recipeRegions', router);
};