import Servings from "./Data/servings.json";
import Flavors from "./Data/flavors.json";
import Toppings from "./Data/toppings.json";

/*****************
 * API SIMULATION
 *****************/

/***
 * SendOrder API
 * @param Order
 * @param Payment
 * @returns {{Success: boolean, Order: *}}
 * @constructor
 */

function SendOrder(Order, Payment) {
  // Simulate Data Sent to API
  console.log("\nProcessing Order...\n");

  // Simulate API generating order with order number
  Order.Number = Math.floor(Math.random() * 1000 + 1);
  Order.Time = new Date();
  Order.Payment = Payment;
  delete Order.CurrentItem;

  // Simulated Response
  return {
    Success: true,
    Order: Order
  };
}

/**
 * GetMenu API
 * @returns {{Servings, Flavors, Toppings}}
 * @constructor
 */

function GetMenu() {
  // Simulated Response
  return {
    Success: true,
    Servings: Servings,
    Flavors: Flavors,
    Toppings: Toppings
  };
}

/**
 * SendPayment API
 * @param amount
 * @param cardDetails
 * @returns {{Success: boolean}}
 * @constructor
 */

function SendPayment(amount, cardDetails) {
  // API Sends Payment Info to Gateway

  let Payment = cardDetails;
  delete Payment.cvv;

  Payment.Amount = amount;
  Payment.Time = new Date();
  Payment.number = "XXXXXXXXXXXX" + cardDetails.number.toString().slice(12, 16);

  // Simulated Response
  return {
    Success: true,
    Payment: Payment
  };
}

/********************
 * FRONTEND API CODE
 ********************/

// Server Request Function
function ServerRequest(request, callback) {
  // Simulate API Request
  let response = request;

  // Simulate API Response
  setTimeout(function () {
    // Callback Function With Response
    callback && callback(response);
  }, 0);
}

// API Requests
let REQUESTS = {
  GetMenu: function (callback) {
    ServerRequest(GetMenu(), callback);
  },
  SendOrder: function (order, paymentDetails, callback) {
    ServerRequest(SendOrder(order, paymentDetails), callback);
  },
  SendPayment: function (amount, cardDetails, callback) {
    ServerRequest(SendPayment(amount, cardDetails), callback);
  }
};

export default REQUESTS;
