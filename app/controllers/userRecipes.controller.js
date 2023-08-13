const db = require("../models");
const Creator = db.creator;
const Recipe = db.recipe;
const User = db.user;
const Op = db.Sequelize.Op;

//Find recipes with userId by title
exports.findUserRecipesTitle= (req, res) => {
  const id = req.params.id;
  const title = req.query.title;
  var titleCondition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findByPk(id, {
    include: [
    {
      model: Recipe,
      as: "recipes",
      where: { [Op.and]: [titleCondition] }
    }]
  })
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
      message: `Cannot find User with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving the Regions."
   });
  });
};

//Find recipes with userId by title
exports.findUserRecipesCreator = (req, res) => {
  const userId = req.params.id;
  const creatorName = req.query.creatorName;
  var creatorNameCondition = creatorName ? { creatorName: { [Op.like]: `%${creatorName}%` } } : null;
  var userIdCondition = userId ? { userId: { [Op.like]: `%${userId}%` }} : null;
  
  Creator.findAll ({
    where: {
    [Op.or]: [
      creatorNameCondition
    ]},
    include: [ 
      {
        model: Recipe,
        as: "recipe",
        where: { [Op.and]: [userIdCondition] }
      }],
    })
    .then(data => { 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving the Creators."
      });
    });
  };
  
