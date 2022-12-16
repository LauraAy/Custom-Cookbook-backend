module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define("recipe", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        recipeType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        servingSize: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          creatorName: {
            type: Sequelize.STRING,
            allowNull: true
          },
          creatorAbout: {
            type: Sequelize.STRING,
            allowNull: true
          },
          recipeIngredients: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          recipeDirections: {
            type: Sequelize.TEXT,
            allowNull: false
          }
    })
    return Recipe;
};