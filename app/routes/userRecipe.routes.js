module.exports = app => {
    const UserRecipes = require("../controllers/userRecipes.controller.js");
    var router = require("express").Router();
  
    //Retrieve recipes with user id
    router.get("/:id", UserRecipes.findUserRecipes)

    //Retrieve all Recipes by user id with title search
    router.get("/search/:id", UserRecipes.findUserRecipesTitle);
  
  app.use('/api/userRecipes', router);
  };