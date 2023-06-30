module.exports = app => {
    
    const creatorRecipes = require("../controllers/creatorRecipe.controller.js");
    
    var router = require("express").Router();
       
       //Retreive all Creators with Recipes
       router.get("/", creatorRecipes.findAllCreatorRecipes);
    
       //Retreive all Recipes with Creators
       router.get("/recipes", creatorRecipes.findAllRecipeCreators);
    
       //Retrieve one Creator with Recipes
       router.get("/:id", creatorRecipes.findCreatorRecipes);
    
       //Retrieve one Recipe with Creator
       router.get("/recipes/:id", creatorRecipes.findRecipeCreators);
    
      //Remove one Creator from Recipe
      router.delete("/", creatorRecipes.removeCreator);

       app.use('/api/creatorRecipes', router);
    };