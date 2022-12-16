const db = require("../models")
const Recipe = db.recipes

//Create and Save a new Recipe
exports.create = (req, res) => {
    //Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //Create a Recipe
    const recipe = {
        title: req.body.title,
        
    }

};

//Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

//Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

//Update a tutorial by the id in the request
exports.update = (req, res) => {

};

//Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

