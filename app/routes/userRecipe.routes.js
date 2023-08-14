module.exports = app => {
    const UserRecipes = require("../controllers/userRecipes.controller.js");
    var router = require("express").Router();

    //Retrieve all Recipes by user id with title search
    router.get("/:id", UserRecipes.findUserRecipesTitle);
    
    //Retrieve all Recipes by user id with title search
    router.get("/creatorSearch/:id", UserRecipes.findUserRecipesCreator);

    //Retrieve all Recipes by user id with title search
    router.get("/regionSearch/:id", UserRecipes.findUserRecipesRegion);

  app.use('/api/userRecipes', router);
  };