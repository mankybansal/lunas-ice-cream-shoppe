import { Order, Menu } from "./types";
import { CompletedOrder, PaymentDetails } from "~/api.ts";

export function calculatePrice(order: Order): number {
  let totalPrice = 0;
  order.items.forEach((item) => {
    item.flavors.forEach((flavor) => (totalPrice += flavor.price));
    item.toppings.forEach((topping) => (totalPrice += topping.price));
  });

  return totalPrice;
}

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
