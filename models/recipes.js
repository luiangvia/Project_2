module.exports = function(sequelize, DataTypes) {
  var Recipes = sequelize.define("Recipes", {
    recipe_name: DataTypes.STRING
  });
  return Recipes;
};
