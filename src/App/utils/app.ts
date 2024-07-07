import { Item, Menu, Order } from "../types.ts";
import { CompletedOrder, PaymentDetails } from "~/api.ts";

export const calculateItemPrice = (item: Item) => {
  const flavorsTotal = item.flavors.reduce((t, { price }) => t + price, 0);
  const toppingsTotal = item.toppings.reduce((t, { price }) => t + price, 0);
  return flavorsTotal + toppingsTotal;
};

export const calculateOrderPrice = (order: Order) =>
  order.items.reduce((total, item) => total + calculateItemPrice(item), 0);

export function appInitPrinter(): void {
  console.log("\n\n");
  console.log("**********************************");
  console.log("Welcome to Luna's Ice Cream Shoppe");
  console.log("**********************************");
  console.log("\nFetching Menu...\n\n");
}

export function paymentPrinter(paymentDetails: PaymentDetails): void {
  console.log("\n");
  console.log("Payment Processed");
  console.log(
    "$" +
      paymentDetails.amount.toFixed(2) +
      " paid by " +
      paymentDetails.network +
      " " +
      paymentDetails.type +
      " ending with " +
      paymentDetails.number.slice(-4)
  );
  console.log("Payment", paymentDetails);
}

export function orderPrinter(sendOrderResponse: CompletedOrder): void {
  console.log("\n");
  console.log("Successfully Processed Order #" + sendOrderResponse.number);
  console.log("Order", sendOrderResponse);
  console.log(
    "Placed at " +
      sendOrderResponse.time.toLocaleTimeString() +
      " on " +
      sendOrderResponse.time.toLocaleDateString()
  );
}

export function menuPrinter(menu: Menu) {
  console.log("Servings Available:", menu.servings);
  console.log("Flavors Available:", menu.flavors);
  console.log("Toppings Available:", menu.toppings);
}
