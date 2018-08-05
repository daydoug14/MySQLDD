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
  password: "root",
  database: "bamazonDB"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });
  
  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + "|" + res[i].product_name
           + "|" + res[i].department_name + "|" + res[i].price + "|" + res[i].stock_quantity);
      }
      console.log("\n\n-----------------------------------------------------------\n\n");
      // console.log(res);
    //   connection.end();

        start();
    });
  }



// function which prompts the user for what action they should take
function start() {
    inquirer.prompt([{
        type: "input",
        name: "item_id",
        message: "Please provide the id of the product you wish to purchase.",
        validate: function(input) {
            if (input === "") {
                console.log("You have not entered a valid item id.Please provide the correct id of the item you are interested in.");
                return false;
            } 
            
            else if (input > 10) {
                console.log("  You have not entered a valid item id.Please provide the correct id of the item you are interested in.");
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "quantity",
        message: "How many units of this item would you like to buy?",
        validate: function(input) {
            if (input === "") {
                console.log("Please specify how many units you'd like to buy.");
                return false;
            } else {
                return true;
            }
        }

    }
]).then(function(input) {
    connection.query("SELECT * FROM products WHERE ?", { item_id: input.item_id }, function(err, res) {
        if (err) throw err;
        if (input.quantity < res[0].stock_quantity) {
            // Update the inventory
            connection.query("UPDATE products SET stock_quantity = " + (res[0].stock_quantity - input.quantity) + " WHERE item_id = " + input.item_id, function(err, data) {
                if (err) throw err;
                console.log("\n\nThank you for your order! Your total is $" + parseFloat(res[0].price * input.quantity).toFixed(2));
                console.log("\n*****************************************************************************");
                // start();
                // End the database connection
                connection.end();
            })
        } else {
            console.log("Sorry, we currently are unable to fulfill this request.");
            console.log("\n--------------------------------------------------------------------------\n");

            connection.end();
        }
    })
})
}
//   inquirer
//   .prompt({
//     name: "action",
//     type: "list",
//     message: "What item number would you like to purchase?",
//     choices: [
//         "(1)bicycle",
//         "(2)copy paper",
//         "(3)laptop",
//         "(4)garden hose",
//         "(5)BB gun",
//         "(6)stapler",
//         "(7)hummingbird feeder",
//         "(8)pizza",
//         "(9)ice cream",
//         "(10)big screen TV"
//     ]
// })
    // .prompt({
    //   name: "item_id",
    //   type: "rawlist",
    //   message: "What item number would you like to buy?",
    //   choices: [1,2,3,4,5,6,7,8,9,10]
    // })
//     .then(function(answer) {
//       // based on their answer, either call the bid or the post functions
//       if (answer.postOrBid.toUpperCase() === "POST") {
//         postAuction();
    //   }
//       else {
//         bidAuction();
//       }
//     });
// }

// function to handle posting new items up for auction
// function postAuction() {
  // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to submit?"
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?"
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name: answer.item,
//           category: answer.category,
//           starting_bid: answer.startingBid,
//           highest_bid: answer.startingBid
//         },
//         function(err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           start();
//         }
//       );
//     });
// }

// function bidAuction() {
  // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    // inquirer
    //   .prompt([
    //     {
    //       name: "choice",
    //       type: "rawlist",
    //       choices: function() {
    //         var choiceArray = [];
    //         for (var i = 0; i < results.length; i++) {
    //           choiceArray.push(results[i].item_name);
    //         }
    //         return choiceArray;
    //       },
    //       message: "What auction would you like to place a bid in?"
    //     },
    //     {
    //       name: "bid",
    //       type: "input",
    //       message: "How much would you like to bid?"
    //     }
    //   ])
    //   .then(function(answer) {
        // get the information of the chosen item
        // var chosenItem;
        // for (var i = 0; i < results.length; i++) {
        //   if (results[i].item_name === answer.choice) {
        //     chosenItem = results[i];
        //   }
        // }

        // determine if bid was high enough
        // if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
        //   connection.query(
        //     "UPDATE auctions SET ? WHERE ?",
        //     [
        //       {
        //         highest_bid: answer.bid
        //       },
        //       {
        //         id: chosenItem.id
        //       }
        //     ],
        //     function(error) {
        //       if (error) throw err;
        //       console.log("Bid placed successfully!");
        //       start();
        //     }
        //   );
        // }
        // else {
          // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }
