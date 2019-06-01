var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8080,

  // Your username
  user: "root",

  // Your password
  password: "ipod115s",
  database: "bamazonDB"
});

connection.connect(function(err){
    if (err) throw err;
    start();
});

function start(){
    inquirer.prompt({
        name: "customer",
        type: "list",
        message: "Would you like to see the current items available?",
        choices: ["Yes", "NO"]
    }).then(function(answer){
        if(answer.customer === "Yes") {
            displayItems();
        } else{
            connection.end();
        }
    });
}

