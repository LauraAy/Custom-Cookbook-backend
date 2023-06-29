const db = require("../models");
const Creator = db.creator;
const Recipe = db.recipe;

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
    