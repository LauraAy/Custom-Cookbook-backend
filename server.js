const express = require("express");
const cors = require("cors");
const app = express();
const RegionController = require("./app/controllers/region.controller.js")


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
// const { sequelize } = require("./app/models");
const Role = db.role; 
const recipeController = require("./app/controllers/recipe.controller.js");



const run = async () => {

// await RegionController.addRecipeRegion(1, 1);
// // >> added Tutorial id=1 to Tag id=1

// await RegionController.addRecipeRegion(1, 2);
// // >> added Tutorial id=2 to Tag id=1

// await RegionController.addRecipeRegion(1, 3);
// // >> added Tutorial id=3 to Tag id=1

// await RegionController.addRecipeRegion(2, 3);

// >> added Tutorial id=3 to Tag id=2

  // //add creator to recipe test
  // await recipeController.addCreator(2, 1);

//add recipe test
  // const rec3 = await controller.createRecipe({
  //   title: "Pot Roast",
  //   description: "Classic comfort food",
  // });
};

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
  run();



// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Custom Cookbook!" });
});

//routes
require("./app/routes/recipe.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/creator.routes')(app);
require("./app/routes/region.routes")(app);
require('./app/routes/regionRecipe.routes')(app);

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });

//   Role.create({
//     id: 2,
//     name: "moderator"
//   });

//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

