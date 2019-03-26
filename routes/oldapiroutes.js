var db = require("../models");

module.exports = function(app) {
  // Get all recipes
  app.get("/api/recipes", function(req, res) {
    db.Recipes.findAll({}).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });


   // POST route for saving a new recipe
   app.post("/api/recipes", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Recipes.create({
      recipe_name: req.body.recipe_name
    }).then(function(dbRecipes) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbRecipes);
    });
  });

  
  // PUT route for updating todos. We can get the updated todo from req.body
  app.put("/api/recipes", function(req, res) {

  });

  /*
  //examples below
  // Create a new example
  app.post("/api/recipes", function(req, res) {
    db.Recipes.create(req.body).then(function(dbExample) {
      res.json(dbRecipes);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  */
};
