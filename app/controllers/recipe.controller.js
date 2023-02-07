const db = require("../models");
const User = db.user;
const Recipe = db.recipe;
const Creator = db.creator
const Op = db.Sequelize.Op;

// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Recipe
  const recipe = {
    title: req.body.title,
    description: req.body.description,
    recipeType: req.body.recipeType,
    servingSize: req.body.servingSize,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    published: req.body.published ? req.body.published : false,
    userId: req.body.userId,
    creatorId: req.body.userId
  };

  // Save Recipe in the database
Recipe.create(recipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recipe."
      });
    });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Recipe.findAll({ where: condition })
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

// Find a single Recipe with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Recipe.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};


// Update a Recipe by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Recipe.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Recipe with id=" + id
      });
    });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Recipe.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Recipe with id=" + id
      });
    });
};

// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
  Recipe.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Recipes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Recipes."
      });
    });
};

// find all published Recipes
exports.findAllPublished = (req, res) => {
  Recipe.findAll({ where: { published: true } })
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

//add a recipe to a creator
exports.addCreator = (recipeId, creatorId)  => {
  return Recipe.findByPk(recipeId)
  .then((recipe) => {
      if (!recipe) {
          console.log('Recipe not found!');
          return null;
      }
  return Creator.findByPk(creatorId).then((creator) => {
      if (!creator) {
          console.log("Creator not found!");
          return null;
      }

      recipe.addCreator(creator);
      console.log(`>> added Recipe id=${recipe.id} to Creator id=${creator.id}`);
      return recipe;
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Creator to Recipe: ", err);
  })
};



//Find creators with recipeId
exports.findRecipeCreators= (req, res) => {
  const id = req.params.id;
Recipe.findByPk(id, { include: ["creators"] })
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
  message: "Error retrieving Recipe with id=" + id
});
});
};



