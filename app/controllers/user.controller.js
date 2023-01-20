const db = require("../models");
const User = db.users;
const Recipe = db.recipes;

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

  //get recipes for a given user
  exports.findUserById = (userID) => {
    return User.findByPk(userId, { include: ["recipes"]})
        .then((user) =>{
            return user;
        })
        .catch((err)=> {
            console.log(">>Error while finding user: ", err);
        });
  };

//   Get the recipe for a given recipe id including user

exports.findRecipeById = (id) => {
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