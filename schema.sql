DROP DATABASE IF EXISTS mealPlanner_db;
CREATE DATABASE mealPlanner_db;

USE mealPlanner_db;

CREATE TABLE recipes(
  id INT NOT NULL AUTO_INCREMENT,
  recipe_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
