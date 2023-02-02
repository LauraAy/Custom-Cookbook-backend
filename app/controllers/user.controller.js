const db = require("../models");
const User = db.users;
const Recipe = db.recipes;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

// Retrieve all users from the database.

exports.findAll = (req, res) => {
  
    User.findAll
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Recipe with id=" + id
        });
      });
  };
  

  //Find single user with id

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Recipe with id=" + id
        });
      });
  };

//Find recipes with userId
exports.findUserRecipes= (req, res) => {
    const id = req.params.id;
User.findByPk(id, { include: ["recipes"] })
.then(data => {
  if (data) {
    res.send(data);
  } else {
    res.status(404).send({
      message: `Cannot find User with id=${id}.`
    });
  }
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Recipe with id=" + id
  });
});
};
//   Get the recipe for a given recipe id including user

exports.findUserbyId = (id) => {
    return Recipe.findbyPk(id, { include: ["recipe"]})
    .then((recipe) => {
        return recipe;
    })
    .catch((err) => {
        console.log(">> Error while finding recipe: ", err);
    })
}

//Get all users include recipes

exports.findAll = () => {
    return User.findAll({
        include: ["recipes"],
    }).then((users) => {
        return users;
    });
};