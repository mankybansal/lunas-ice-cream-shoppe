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

function SendOrder(order) {
    // Simulate Data Sent to API
    console.log("Order Sent to API", order);

    // Simulate API generating order with order number
    order.number = 999;

    // Simulated Response
    return {
        Success: true,
        Order: order
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
    // Send payment info to gateway

    // Simulated Response
    return {
        Success: true
    }
}

/********************
 * FRONTEND API CODE
 ********************/

function ServerRequest(request, callback) {
    // HTTP REQUEST API CALLER GOES HERE

    callback && callback(request);
}

// API REQUESTS
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


