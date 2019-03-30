var connection = require("./connection.js");

// Object Relational Mapper (ORM)

var orm = {
  selectAll: function(tableInput, colToSearch) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput, colToSearch], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  
  }
};

module.exports = orm;
