module.exports = app => {
    const users = require("../controllers/user.controller.js");
    
    var router = require("express").Router();

//Retrieve all users
router.get("/", users.findAll);

//Retrieve user with id
router.get("/:id", users.findOne);

//Retrieve recipes with user id
router.get("/recipes/:id", users.findUserRecipes)

app.use('/api/users', router);

};