const { INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipe", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    recipeType: {
      type: Sequelize.STRING
    },
    servingSize: {
      type: Sequelize.INTEGER
    },
    ingredients: {
      type: Sequelize.TEXT
    },
    directions: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Recipe;
};