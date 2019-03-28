$(document).ready(function() {
    // Getting a reference to the input field where user adds a new recipe
    var $newItemInput = $("input.new-item");
    // Our new recipes will go inside the recipeContainer
    var $recipeContainer = $(".recipe-container");
    // Adding event listeners for deleting, editing, and adding recipes
    $(document).on("click", "button.delete", deleteRecipe);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".recipe-item", editRecipe);
    $(document).on("keyup", ".recipe-item", finishEdit);
    $(document).on("blur", ".recipe-item", cancelEdit);
    $(document).on("submit", "#recipe-form", insertRecipe);
  
    // Our initial recipes array
    var recipes = [];
  
    // Getting recipes from database when page loads
    getRecipes();
  
    // This function resets the recipes displayed with new recipes from the database
    function initializeRows() {
      $recipeContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < recipes.length; i++) {
        rowsToAdd.push(createNewRow(recipes[i]));
      }
      $recipeContainer.prepend(rowsToAdd);
    }
  
    // This function grabs recipes from the database and updates the view
    function getRecipes() {
      $.get("/api/recipes", function(data) {
        recipes = data;
        initializeRows();
      });
    }
  
    // This function deletes a recipe when the user clicks the delete button
    function deleteRecipe(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/recipes/" + id
      }).then(getRecipes);
    }
  
    // This function handles showing the input box for a user to edit a recipe
    function editRecipe() {
      var currentRecipe = $(this).data("recipe");
      $(this).children().hide();
      $(this).children("input.edit").val(currentRecipe.text);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // Toggles complete status
    function toggleComplete(event) {
      event.stopPropagation();
      var recipe = $(this).parent().data("recipe");
      recipe.complete = !recipe.complete;
      updateRecipe(recipe);
    }
  
    // This function starts updating a recipe in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedRecipe = $(this).data("recipe");
      if (event.which === 13) {
        updatedRecipe.text = $(this).children("input").val().trim();
        $(this).blur();
        updateRecipe(updatedRecipe);
      }
    }
  
    // This function updates a recipe in our database
    function updateRecipe(recipe) {
      $.ajax({
        method: "PUT",
        url: "/api/recipes",
        data: recipe
      }).then(getRecipes);
    }
  
    // This function is called whenever a recipe item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentRecipe = $(this).data("recipe");
      if (currentRecipe) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentRecipe.text);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a recipe-item row
    function createNewRow(recipe) {
      var $newInputRow = $(
        [
          "<li class='list-group-item recipe-item'>",
          "<span>",
          recipe.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", recipe.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("recipe", recipe);
      if (recipe.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new recipe into our database and then updates the view
    function insertRecipe(event) {
      event.preventDefault();
      var recipe = {
        text: $newItemInput.val().trim(),
        complete: false
      };
  
      $.post("/api/recipes", recipe, getRecipes);
      $newItemInput.val("");
    }
  });
  