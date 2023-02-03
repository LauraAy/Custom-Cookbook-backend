const { DECIMAL, STRING } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Region = sequelize.define("region", {
   
    regionName: {
        type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.DECIMAL(8,6)
    },
    lng: {
      type: Sequelize.DECIMAL(9,6)
    }
  });
  
  return Region;
};