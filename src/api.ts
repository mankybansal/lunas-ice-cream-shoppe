import { Menu, Order } from "./App/types";

import { CardDetails } from "~/App/config";
import flavors from "~/fixtures/flavors.json";
import servings from "~/fixtures/servings.json";
import toppings from "~/fixtures/toppings.json";


/*****************
 * API SIMULATION
 *****************/

export interface CompletedOrder extends Order {
  number: number;
  time: Date;
  payment: PaymentDetails;
}

export interface PaymentDetails extends Omit<CardDetails, "cvv"> {
  amount: number;
  time: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

function SendOrder(
  order: Order,
  payment: PaymentDetails
): ApiResponse<CompletedOrder> {
  // Simulate Data Sent to API
  console.log("\nProcessing Order...\n");

  // Simulate API generating order with order number
  const completedOrder = {
    ...order,
    number: Math.floor(Math.random() * 1000 + 1),
    time: new Date(),
    payment
  };

  // Simulated Response
  return { success: true, data: completedOrder };
}

function GetMenu(): ApiResponse<Menu> {
  // Simulated Response
  const menu: Menu = { servings, flavors, toppings };
  return { success: true, data: menu };
}

function SendPayment(
  amount: number,
  cardDetails: CardDetails
): ApiResponse<PaymentDetails> {
  // API Sends Payment Info to Gateway

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cvv: _, ...restCardDetails } = cardDetails;
  const last4Digits = cardDetails.number.toString().slice(12, 16);

  const payment: PaymentDetails = {
    ...restCardDetails,
    amount,
    time: new Date(),
    number: "XXXXXXXXXXXX" + last4Digits
  };

  // Simulated Response
  return { success: true, data: payment };
}

/********************
 * FRONTEND API CODE
 ********************/

type Callback<T> = (response: T) => void;

const simulatedFetch = <T>(
  request: T,
  callback: Callback<T>
): Promise<void> => {
  // Simulate API Request
  const response = request;

  // Simulate API Response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      // Callback Function With Response
      callback && callback(response);
    }, 500);
  });
};

// API Requests
const REQUESTS = {
  GetMenu: function (callback: Callback<ApiResponse<Menu>>) {
    return simulatedFetch(GetMenu(), callback);
  },
  SendOrder: function (
    order: Order,
    paymentDetails: PaymentDetails,
    callback: Callback<ApiResponse<CompletedOrder>>
  ) {
    return simulatedFetch(SendOrder(order, paymentDetails), callback);
  },
  SendPayment: function (
    amount: number,
    cardDetails: CardDetails,
    callback: Callback<ApiResponse<PaymentDetails>>
  ) {
    return simulatedFetch(SendPayment(amount, cardDetails), callback);
  }
};

export default REQUESTS;
