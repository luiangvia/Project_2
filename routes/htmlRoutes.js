var path = require("path");

module.exports = function(app) {

  	// A GET Route to `/contact` which should display the contact page.
	app.get("/contact", function(req, res) {
		res.sendFile(path.join(__dirname, "/../views/contact.html"));
  });
  
  	// A GET Route to `/recipes` which should display the recipe page.
  app.get("/recipes", function(req, res) {
		res.sendFile(path.join(__dirname, "/../views/recipes.html"));
	});

	// A GET Route to `/grocery` which should display the grocery page.
	app.get("/grocery", function(req, res) {
		res.sendFile(path.join(__dirname, "/../views/grocery.html"));
	});

	//  A default, catch-all route that leads to `home.html` which displays the home page.
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname, "/../views/index.html"));
	});

};


