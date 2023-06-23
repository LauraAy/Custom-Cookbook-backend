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

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.recipe = require("../models/recipe.model.js")(sequelize, Sequelize);
db.creator = require("../models/creator.model.js")(sequelize, Sequelize);
db.region = require("../models/region.model.js")(sequelize, Sequelize);
db.stateProvince = require("../models/stateProvince.model.js")(sequelize, Sequelize);
db.region_recipe = require("../models/region_recipe.model.js")(sequelize, Sequelize)

// //One to many relationship between regions and recipes.
// db.region.hasMany(db.recipe, { as: "recipes" });
// db.recipe.belongsTo (db.region, {
//   foreignKey: "regionId",
//   as: "regions",
// });

//setting up region_recipe table
db.region_recipe.belongsTo(db.recipe, {
  foreignKey: "recipeId"
});
db.region_recipe.belongsTo(db.region, {
  foreignKey: "regionId"
});

db.region.associate = (db) => {
  db.region.belongsToMany(db.recipe, {
    through: 'region_recipes',
    as: 'recipes',
    foreignKey: 'regionId',
    otherKey: 'recipeId'
  });
}

db.recipe.associate = (db) => {
  db.recipe.belongsToMany(db.region, {
    through: 'region_recipes',
    as: 'regions',
    foreignKey: 'recipeId',
    otherKey: 'regionId'
  });
}


// Many to many relationship between recipes and regions.
// db.region.belongsToMany(db.recipe, {
//   through: "region_recipes",
//   as: "recipes",
//   foreignKey: "regionId",
//   otherKey: "recipeId"
// });
// db.recipe.belongsToMany(db.region, {
//   through: "region_recipes",
//   as: "regions,",
//   foreignKey: "recipeId",
//   otherKey: "regionId"
// });

//One to many relationship between creators and recipes.
db.creator.hasMany(db.recipe, { as: "recipes" });
db.recipe.belongsTo (db.creator, {
  foreignKey: "creatorId",
  as: "creators",
});

//One to many relationship between user and recipes.
db.user.hasMany(db.recipe, { as: "recipes" });
db.recipe.belongsTo (db.user, {
  foreignKey: "userId",
  as: "users",
});

//One to many relationship between regions and stateProvinces.
db.region.hasMany(db.stateProvince, { as: "stateProvinces" });
db.stateProvince.belongsTo (db.region, {
  foreignKey: "regionId",
  as: "regions",
});

//Many to many relationship between user and roles.
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});



// //one to many relationship for creators and recipes
// db.recipe.belongsToMany(db.creator, {
//   through: "creator_recipe",
//   as: "creators",
//   foreignKey: "recipeId",
// });
// db.creator.belongsToMany(db.recipe, {
//   through: "creator_recipe",
//   as: "recipes",
//   foreignKey: "creatorId",
// });


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;