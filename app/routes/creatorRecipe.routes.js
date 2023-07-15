module.exports = app => {
    
    const creatorRecipes = require("../controllers/creatorRecipe.controller.js");
    
    var router = require("express").Router();
      
      //Add creator to region
      router.post("/", creatorRecipes.createCreatorRecipe);

       //Retreive all Creators with Recipes
       router.get("/", creatorRecipes.findCreatorRecipes);
    
       //Retreive all Recipes with Creators
       router.get("/recipes", creatorRecipes.findRecipeCreators);
    
       //Retrieve one Creator with Recipes
       router.get("/:id", creatorRecipes.findOneCreatorRecipe);
    
       //Retrieve one Recipe with Creator
       router.get("/recipes/:id", creatorRecipes.findOneRecipeCreator);
    
      //Remove one Creator from Recipe
      router.delete("/", creatorRecipes.removeCreator);

       app.use('/api/creatorRecipes', router);
    };