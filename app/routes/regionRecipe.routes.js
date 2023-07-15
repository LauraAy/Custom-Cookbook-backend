module.exports = app => {
    const regions = require("../controllers/region.controller.js");
    const recipes = require("../controllers/recipe.controller.js");
    const regionRecipes = require("../controllers/regionRecipe.controller.js");
    
    var router = require("express").Router();

    //Add recipe to region
    router.post("/", regionRecipes.createRegionRecipe);

    //Retrieve all regions with recipes
    router.get("/", regionRecipes.findRegionRecipes);

    //Retrieve all recipes with regions
    router.get("/recipes", regionRecipes.findRecipeRegions);

    //Retrieve one region with recipes
    router.get("/:id", regionRecipes.findOneRegionRecipe);

    //Retrieve one recipe with regions
    router.get("/recipes/:id", regionRecipes.findOneRecipeRegion) 

    //Delete one region from a recipe
    router.delete("/", regionRecipes.removeRegion);
 

    app.use('/api/regionRecipes', router);
};