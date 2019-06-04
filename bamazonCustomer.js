var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

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

function displayItems(){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: function(){
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++){
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                },
                message: "What would you like to purchase?"
            },
            {
                name: "quanity",
                type: "number",
                message: "how many items do you want to purchase?"
            }
        ])
        .then(function(answer){

        })
    })
}