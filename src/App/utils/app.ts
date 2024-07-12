import { Item, Menu, Order } from "../types.ts";
import { CompletedOrder, PaymentDetails } from "~/api.ts";

export const calculateItemPrice = (item: Item) => {
  const flavorsTotal = item.flavors.reduce((t, { price }) => t + price, 0);
  const toppingsTotal = item.toppings.reduce((t, { price }) => t + price, 0);
  return flavorsTotal + toppingsTotal;
};

export const calculateOrderPrice = (order: Order) =>
  order.items.reduce((total, item) => total + calculateItemPrice(item), 0);

export function printAppInit(): void {
  console.log("\n\n");
  console.log("**********************************");
  console.log("Welcome to Luna's Ice Cream Shoppe");
  console.log("**********************************");
  console.log("\nFetching Menu...\n\n");
}

export function printPayment(paymentDetails: PaymentDetails): void {
  console.log("\n");
  console.log("Payment Processed");
  const { amount, network, type, number } = paymentDetails;
  console.log(
    `$${amount} paid by ${network} ${type} ending with ${number.slice(-4)}`
  );
  console.log("Payment", paymentDetails);
}

export function printOrder(sendOrderResponse: CompletedOrder): void {
  console.log("\n");
  console.log("Successfully Processed Order #" + sendOrderResponse.number);
  console.log("Order", sendOrderResponse);
  const time = sendOrderResponse.time.toLocaleTimeString();
  const date = sendOrderResponse.time.toLocaleDateString();
  console.log("Placed at " + time + " on " + date);
}

export function printMenu(menu: Menu) {
  console.log("Servings Available:", menu.servings);
  console.log("Flavors Available:", menu.flavors);
  console.log("Toppings Available:", menu.toppings);
}
