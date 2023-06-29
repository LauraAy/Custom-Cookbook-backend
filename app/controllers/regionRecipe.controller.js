const db = require("../models");
const Region = db.region;
const Recipe = db.recipe;
const RegionRecipe = db.region_recipe;

 //Add recipe to region.
exports.createRegionRecipe = (req, res) => {

    const regionRecipe = {
      regionId: req.body.regionId,
      recipeId: req.body.recipeId
    };
  
    RegionRecipe.create(regionRecipe)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding the recipe to region."
        });
      });
  };

//Find all regions with recipes
exports.findRegionRecipes = (req, res) => {
    Region.findAll ({
        attributes: ['country', 'regionName'], include: [ 
         {
          model: Recipe,
          as: "recipe",
          attributes: ['title']
        }],
  })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving the Regions."
          });
        });
    };

//Find a single region with recipes
exports.findOneRegionRecipe = (req, res) => {
        const id = req.params.id;
      
        Region.findByPk(id, {
        attributes: ["country", "regionName"], include: [ 
         {
          model: Recipe,
          as: "recipe",
          attributes: ['title']
        }],
  })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving the Region."
          });
        });
    };

//Find all recipes with regions
    exports.findRecipeRegions = (req, res) => {
    
      Recipe.findAll({
      attributes: ['title'], include: [ 
       {
        model: Region,
        as: "region",
        attributes: ['country', 'regionName']
      }],
  })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the Region."
        });
      });
  };

    //Find a single recipe with regions
exports.findOneRecipeRegion = (req, res) => {
    const id = req.params.id;
  
    Recipe.findByPk(id, {
    attributes: ['title'], include: [ 
     {
      model: Region,
      as: "region",
      attributes: ['country', 'regionName']
    }],
})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Region."
      });
    });
};
  
  exports.removeRegion = (req, res) => {
    const recipeId = req.body.recipeId
    const regionId = req.body.regionId 

    Recipe.findOne({
        where: { id: recipeId }
    }).then(recipe => {
        recipe.removeRegion([regionId])
        res.sendStatus(200);
    }).catch(e => console.log(e));
}