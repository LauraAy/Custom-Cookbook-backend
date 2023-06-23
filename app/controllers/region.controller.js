const db = require("../models");
const Region = db.region;
const Recipe = db.recipe;
const RegionRecipe = db.region_recipe;
const Op = db.Sequelize.Op;

// Create and Save a new Region
exports.create = (req, res) => {

  const region = {
    regionName: req.body.regionName,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    lat: req.body.lat,
    lng: req.body.lng,
  };


  // Save Region in the database
Region.create(region)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Region."
      });
    });
};

exports.createRegionRecipe = (req, res) => {

  const regionRecipe = {
    regionId: req.body.regionId,
    recipeId: req.body.recipeId
  };

  // Save Region in the database
  RegionRecipe.create(regionRecipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Region."
      });
    });
};

// Retrieve all Regions from the database.
exports.findAll = (req, res) => {

  Region.findAll ()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recipes."
      });
    });
};

// Find a single Region with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Region.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Region with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Region with id=" + id
      });
    });
};


// Update a Recipe by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Region.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Region was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Region with id=${id}. Maybe Region was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Region with id=" + id
      });
    });
};

// Delete a Region with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Region.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Region was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Region with id=${id}. Maybe Region was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Region with id=" + id
      });
    });
};

// Delete all Regions from the database.
exports.deleteAll = (req, res) => {
  Region.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Regions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Regions."
      });
    });
};

// find all published Recipes
exports.findAllPublished = (req, res) => {
  Region.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Regions."
      });
    });
};

// Find  all recipes with regions
// exports.findRegionRecipes = (req, res) => {
//   RegionRecipe.findAll ({
//       attributes: ["id"], include: [ 
//         {
//         model: Region,
//         as: "region",
//         attributes: ['country', 'regionName'],
//       }, {
//         model: Recipe,
//         as: "recipe",
//         attributes: ['title']
//       }],
// })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving Recipes."
//         });
//       });
//   };

exports.findRegionRecipes = (req, res) => {
  Region.findAll ({
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
            err.message || "Some error occurred while retrieving Recipes."
        });
      });
  };

// exports.findRegionRecipes= (req, res) => {
//     // const id = req.params.id;
//   Region.findAll({ 
//     include: [
//     {
//       model: Recipe,
//       as: "recipes",
//       attributes: ["id", "title", "description"],
//       through: {
//         attributes: [],
//       }
//     }
//   ] 
// })
//   .then((regions) => {
//     return regions;
//   })
//   .catch((err) => {
//   res.status(500).send({
//     message: "It didn't work. :("
//   });
//   })
// }

  //Add recipe to region
  exports.addRecipe = (req, res) => {
    const regionId = req.body.regionId;
    const recipeId = req.body.recipeId;
    
    return Region.findByPk(regionId)
    .then((region) => {
      if (!region) {
        console.log("Region not found!");
        return null;
      }
      return Recipe.findByPk(recipeId)
      .then((recipe) => {
        if (!recipe) {
          console.log("Recipe not found!");
          return null;
        }
        return region.addRecipe(recipe);
          console.log(`>> added Recipe id=${recipe.id} to Region id=${region.id}`);
          res.send({
            message: "Region was deleted successfully!"
          });
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Recipe to Region: ", err);
      });
  };