DROP DATABASE IF EXISTS mealplanner_db;
CREATE DATABASE mealplanner_db;

USE mealplanner_db;

CREATE TABLE recipes(
  id INT NOT NULL AUTO_INCREMENT,
  recipe_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
