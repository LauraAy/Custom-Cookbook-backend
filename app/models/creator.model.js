const { STRING, TEXT } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Creator = sequelize.define("creator", {
    creatorName: {
      type: Sequelize.STRING
    },
    about: {
      type: Sequelize.TEXT
    },
    link: {
      type: Sequelize.TEXT
    }
  });

  return Creator;
};