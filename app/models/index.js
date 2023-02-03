const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model.js")(sequelize, Sequelize);
db.roles = require("../models/role.model.js")(sequelize, Sequelize);
db.recipes = require("../models/recipe.model.js")(sequelize, Sequelize);
db.creators = require("../models/creator.model.js")(sequelize, Sequelize);
db.regions = require("../models/region.model.js")(sequelize, Sequelize);


//Many to many relationship between recipes and regions.
db.recipes.belongsToMany(db.regions, {
  through: "region_recipe",
  as: "regions",
  foreignKey: "recipeId",
});
db.regions.belongsToMany(db.recipes, {
  through: "region_recipe",
  as: "recipes",
  foreignKey: "regionId",
});

//Many to many relationship between recipes and creators.
db.recipes.belongsToMany(db.creators, {
  through: "creator_recipe",
  as: "creators",
  foreignKey: "recipeId",
});
db.creators.belongsToMany(db.recipes, {
  through: "creator_recipe",
  as: "recipes",
  foreignKey: "creatorId",
});


//One to many relationship between user and recipes.
db.users.hasMany(db.recipes, { as: "recipes" });
db.recipes.belongsTo (db.users, {
  foreignKey: "userId",
  as: "users",
});

//Many to many relationship between users and roles.
db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;