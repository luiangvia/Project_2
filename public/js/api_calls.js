// Initial array of recipes
var recipes = ["Breakfast Pizza", "Chicken Vesuvio", "Pasta Frittata Recipe", "Lomo Saltado",
    "Chicken Paprikash"
];

var id = "cb29f88c";
var key = "d602f1e3d5650efe09b61a38753a9132";

function displayRecipeInfo() {
    $("#recipes-view").empty();
    var recipe = $(this).attr("data-name");
    var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=" + id + "&app_key=" + key ;
  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 9; i++) {
            var recipeDiv = $("<div class='recipe'>");
            var recipeName = response.hits[i].recipe.label;
            var pOne = $("<p>").text("Name: " + recipeName);
            recipeDiv.append(pOne);
            var calories = response.hits[i].recipe.calories;
            var pTwo = $("<p>").text("Calories: " + calories);
            recipeDiv.append(pTwo);
            var ingredients = response.hits[i].recipe.ingredientLines;
            var pThree = $("<p>").text("Ingredients: " + ingredients);
            recipeDiv.append(pThree);
            var imgURL = response.hits[i].recipe.image;
            var image = $("<img>").attr("src", imgURL);
            recipeDiv.append(image);
            var ingredients = response.hits[i].recipe.ingredientLines;
            var pThree = $("<p>").text("Ingredients: " + ingredients);
            recipeDiv.append(pThree);
            var link = $("<a>");
            link.text("More info");
            sourceLink = response.hits[i].recipe.url;
            link.attr("href", sourceLink);
            link.attr("target", "_blank");
            recipeDiv.append(link);

            $("#recipes-view").prepend(recipeDiv);
        };
    });
}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < recipes.length; i++) {

        var a = $("<button>");
        a.addClass("recipe-btn");
        a.attr("data-name", recipes[i]);
        a.text(recipes[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-recipe").on("click", function (event) {
    event.preventDefault();
    var recipe = $("#recipe-input").val().trim();
    recipes.push(recipe);
    renderButtons();
});
$(document).on("click", ".recipe-btn", displayRecipeInfo);
renderButtons();