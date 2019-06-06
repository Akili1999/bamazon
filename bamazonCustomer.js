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
  password: "",
  database: "bamazonDB"
});
// This connection triggers the start function which the landing page of our app
connection.connect(function(err){
    if (err) throw err;
    start();
});
// This function starts off by asking the customer if they want to see the current items available
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
// When the customer selects yes, they see all the products that are currently in the table, and can select from them
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
            { // This asks the customer how many items the customer would like to purchase
                name: "quanity",
                type: "number",
                message: "how many items do you want to purchase?"
            }
        ]) // The following is updating the table so that we can reflect info on the table
        .then(function(answer){
            for(var i = 0; i < results.length; i++){
                if (results[i].product_name === answer.choice){
                    chosenItem = results[i];
                }
            }
            checkStore(chosenItem.id,answer.quanity,chosenItem.product_name,chosenItem.price,chosenItem.stock_quanity)
        })
    })
}
// This checks the store to see if the items the customer wants are available. If they are, the customer can buy them, and it will update on the
// database
// If there aren't enough items for the customer to buy, it informs the customer to try again, and that the item is out of stock
function checkStore(id, quanity, product, price, available){
var inStock = false;
var remaining = parseInt(available) - parseInt(quanity)
if (remaining >= 0){
    inStock = true;
    console.log(`Alrighty, looks like we have just enough in stock \n`);
    console.log(`Your order is ${quanity} of ${product}s. Your total comes out to ${quanity*price}\n`);
    connection.query(`UPDATE products SET stock_quanity = '${remaining}' WHERE id='${id}';`, function(err, res){
        if (err) throw err;
    })
} else {
    console.log("Sorry, but our stock does not line up with your order, please lower the quanity of your order, and try again")
}
}