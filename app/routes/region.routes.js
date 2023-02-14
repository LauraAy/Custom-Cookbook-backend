module.exports = app => {
    const regions = require("../controllers/region.controller.js");
    
    var router = require("express").Router();

    //Create a new Creator
    router.post("/", regions.create);

    //Retrieve all Creators
    router.get("/", regions.findAll);

    //Retrieve a single Creator with id
    router.get("/:id", regions.findOne);

    //Update a Creator with id
    router.put("/:id", regions.update);

    //Delete a Creator with id
    router.delete("/:id", regions.delete);

    //Delete all Recipes
    router.delete("/", regions.deleteAll);

    //Retrieve recipes with creator id
    router.get("/recipes/:id", regions.findRegionRecipes);


    app.use('/api/regions', router);
};