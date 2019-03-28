//npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');

//SQL database connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'henry1',
    database: "bamazon"
});
con.connect(function (error) {
    if (error) throw error;
    console.log('Connected!');
    initialMenu();
});

//the welcome greeting displayed to the user
function initialMenu() {
    console.log("Welcome to the PokéMart!");
    buyPrompt();
};

//mysql query pulls list of items
//inquirer prompt asks user for id and quantity of the item they wish to buy
//query checks stock and totals the cost for the user, then subtracts the amount purchased from the DB
function buyPrompt() {
    con.query('SELECT * FROM products;', function (error, results) {
        if (error) throw error;
        for (let i = 0; i < results.length; i++) {
            console.log(
                "id: " + results[i].item_id + " | "
                + results[i].product_name + " | "
                + results[i].department_name + " | ₽"
                + results[i].price + " | "
                + results[i].stock_quantity);
        };
    });
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "What would you like to purchase? (enter item id)"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }
    ])
        .then(function (userInput) {
            con.query('SELECT * FROM products WHERE item_id=' + userInput.item_id + ';', function (error, results) {
                if (error) throw error;
                if (results[0].stock_quantity < userInput.quantity) {
                    console.log("Sorry! We don't have that many of that item in stock!");
                    buyAgain();
                }
                else {
                    var buyQuantity = userInput.quantity;
                    inquirer.prompt([
                        {
                            name: "answer",
                            type: "list",
                            message: "You want " + userInput.quantity + " " + results[0].product_name +
                                ". That will be ₽" + userInput.quantity * results[0].price + ". Is that OK?"
                            ,
                            choices: ["Yes", "No"]
                        }
                    ])
                        .then(function (userInput) {
                            let newQuantity = results[0].stock_quantity - buyQuantity;
                            if (userInput.answer == "Yes") {
                                con.query('UPDATE products SET stock_quantity=' + newQuantity + ' WHERE item_id="' + results[0].item_id + '";', function (error, results){
                                    if (error) throw error;
                                    console.log("Thank you!")
                                    buyAgain();
                                });
                            }
                            else {
                                buyAgain();
                            }
                        })
                }
            })
        })
};

//asks if the user wants to make another purchase
function buyAgain() {
    inquirer.prompt([
        {
            name: "answer",
            type: "list",
            message: "Is there anything else you need?",
            choices: ["Yes", "No"]
        }
    ])
        .then(function (userInput) {
            if (userInput.answer == "Yes") {
                buyPrompt();
            }
            else {
                console.log("Have a nice day!");
            }
        })
};

