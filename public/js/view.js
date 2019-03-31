$(document).ready(function () {

  //TODO: Change naming convention from 'todo' to 'recipe'

  // Getting a reference to the input field where user adds a new recipe

  // Our new recipes will go inside the todoContainer
  var $todoContainer = $(".todo-container");
  // Adding event listeners for deleting, editing, and adding recipes
  $(document).on("click", "button.delete", deleteTodo);

  $(document).on("click", "button.addRecipe", insertTodo);

  // Our initial recipes array
  var todos = [];

  // Getting recipes from database when page loads
  getTodos();

  // This function resets the recipes displayed with new recipes from the database
  function initializeRows() {
    $todoContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < todos.length; i++) {
      rowsToAdd.push(createNewRow(todos[i]));
    }
    $todoContainer.prepend(rowsToAdd);
  }

  // This function grabs recipes from the database and updates the view
  function getTodos() {
    $.get("/api/todos", function (data) {
      todos = data;
      initializeRows();
    });
  }

  // This function deletes a recipe when the user clicks the delete button
  function deleteTodo(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/todos/" + id
    }).then(getTodos);
  }


  // This function constructs a recipe-item row
  function createNewRow(todo) {
    var $newInputRow = $(
      [
        "<li class='list-group-item d-flex justify-content-between align-items-center todo-item'>",
        "<h4>",
        todo.text,
        "</h4>",
        "<button class='delete btn btn-danger'>Remove</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", todo.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("todo", todo);
    if (todo.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new recipe into our database and then updates the view
  function insertTodo(event) {
    event.preventDefault();
    var $newItemInput = $(this).val();
    console.log($newItemInput);
    var todo = {
      text: $newItemInput,
      complete: false
    };

    $.post("/api/todos", todo, getTodos);
    $newItemInput;
  }
});
