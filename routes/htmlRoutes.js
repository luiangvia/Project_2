var path = require("path");

module.exports = function(app) {

	app.get("/contact", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/contact.html"));
  });
  
  app.get("/recipes", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/recipes.html"));
	});

	// A GET Route to `/survey` which should display the grocery page.
	app.get("/grocery", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/grocery.html"));
	});

	//  A default, catch-all route that leads to `home.html` which displays the home page.
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/index.html"));
	});

};






/*var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
*/

