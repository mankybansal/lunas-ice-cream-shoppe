import Servings from './Data/servings.json';
import Flavors from './Data/flavors.json';
import Toppings from './Data/toppings.json';

/*****************
 * API SIMULATION
 *****************/

/***
 * SendOrder API
 * @param order
 * @returns {{Success: boolean, Order: *}}
 * @constructor
 */

function SendOrder(Order) {
    // Simulate Data Sent to API
    console.log("\n\nOrder Sent to API");

    // Simulate API generating order with order number
    Order.Number = Math.floor((Math.random() * 1000) + 1);
    Order.Time = new Date();
    delete Order.CurrentItem;

    // Order Received By API
    console.log(Order);

    // Simulated Response
    return {
        Success: true,
        Order: Order
    }
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

    console.log("\n\n$" + amount.toFixed(2) + " payed by " + cardDetails.network + " " + cardDetails.type + " ending with " + cardDetails.number.toString().slice(11,15));
    // Simulated Response
    return {
        Success: true
    }
}

/********************
 * FRONTEND API CODE
 ********************/

// Server Request Function
function ServerRequest(request, callback) {

    // Make HTTP Request to API

    // Simulate API Request
    let response = request;

    // Callback Function With Response
    callback && callback(response);
}

// API Requests
let REQUESTS = {
    GetMenu: function (callback) {
        ServerRequest(GetMenu(), callback);
    },
    SendOrder: function (order, callback) {
        ServerRequest(SendOrder(order), callback);
    },
    SendPayment: function (amount, cardDetails, callback){
        ServerRequest(SendPayment(amount, cardDetails), callback);
    }
};

export default REQUESTS;


