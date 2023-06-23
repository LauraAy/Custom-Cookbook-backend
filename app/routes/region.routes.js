module.exports = app => {
    const regions = require("../controllers/region.controller.js");
    
    var router = require("express").Router();

    //Create a new Region
    router.post("/", regions.create);

    //Retrieve all Regions
    router.get("/", regions.findAll);

    //Retrieve a single Region with id
    router.get("/:id", regions.findOne);

    //Update a Region with id
    router.put("/:id", regions.update);

    //Delete a Region with id
    router.delete("/:id", regions.delete);

    //Delete all Regions
    router.delete("/", regions.deleteAll);

    //Retrieve recipes with region id
    router.get("/recipeRegions", regions.findAll);

    //add recipe to region
    router.post("/addRecipes", regions.createRegionRecipe);

    app.use('/api/regions', router);
};