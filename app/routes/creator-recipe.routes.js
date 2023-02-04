module.exports = app => {
    const creators = require("../controllers/creator.controller.js");
    
    var router = require("express").Router();

 //Add recipes to creator
   router.post("/", creators.addRecipe);

   app.use('/api/creators-recipes', router);
};