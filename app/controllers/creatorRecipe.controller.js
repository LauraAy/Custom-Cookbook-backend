const db = require("../models");
const Creator = db.creator;
const Recipe = db.recipe;

//Add Creator to Region
exports.createCreatorRecipe = (req, res) => {

  const creatorRecipe = {
    creatorId: req.body.creatorId,
    recipeId: req.body.recipeId
  };

  CreatorRecipe.create(creatorRecipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the creator to region."
      });
    });
};

//Find all Pairings with Recipes
exports.findAllCreatorRecipes= (req, res) => {
  
    Creator.findAll({ include: ["recipes"] })
    .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Creator with id=${id}.`
      });
    }
    })
    .catch(err => {
    res.status(500).send({
      message: "Error retrieving Creator with id=" + id
    });
    });
    };
    
    
    //Find one Pairing with Recipes
    exports.findCreatorRecipes= (req, res) => {
      const id = req.params.id;
    
    Creator.findByPk(id, { include: ["recipes"] })
    .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Creator with id=${id}.`
      });
    }
    })
    .catch(err => {
    res.status(500).send({
      message: "Error retrieving Creator with id=" + id
    });
  });
};

//Find all Recipes with Creators
exports.findAllRecipeCreators= (req, res) => {
  
    Recipe.findAll({ include: ["creators"] })
    .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Recipe with id=${id}.`
      });
    }
    })
    .catch(err => {
    res.status(500).send({
      message: "Error retrieving Creator with id=" + id
    });
    });
    };

    //Find one Recipe with Pairings
        exports.findRecipeCreators= (req, res) => {
            const id = req.params.id;
          
          Recipe.findByPk(id, { include: ["creators"] })
          .then(data => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find Creator with id=${id}.`
            });
          }
          })
          .catch(err => {
          res.status(500).send({
            message: "Error retrieving Creator with id=" + id
          });
        });
      };
    
      exports.removeCreator = (req, res) => {
        const recipeId = req.body.recipeId
        const creatorId = req.body.creatorId 
      
        Creator.findOne({
            where: { id: creatorId }
        }).then(creator => {
            creator.removeRecipes([recipeId])
            res.sendStatus(200);
        }).catch(e => console.log(e));
      }