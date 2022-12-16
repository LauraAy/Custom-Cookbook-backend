const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dibConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

const db = {};

 db.Sequelize = Sequelize;
 db.sequelize = sequelize;

 db.recipes = require("./recipe.model.js")(sequelize, Sequelize);

 module.exports = db;