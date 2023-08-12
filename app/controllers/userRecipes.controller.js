const { recipe } = require("../models");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

//Find recipes with userId
exports.findUserRecipes= (req, res) => {
    const id = req.params.id;
User.findByPk(id, { include: ["recipes"] })
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
    message: "Error retrieving User with id=" + id
  });
});
};

//Find recipes with userId by title
exports.findUserRecipesTitle= (req, res) => {
  const id = req.params.id;
  const title = req.query.title;
  var titleCondition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findByPk(id, {
    include: [
    {
      model: recipe,
      // as: "recipes",
      where: { titleCondition }
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
    message: "Error retrieving User with id=" + id
   });
  });
};