export function calculatePrice(Order) {
  let TotalPrice = 0;
  Order.Items.map((Item) => {
    Item.Flavors.map((Flavor) => {
      TotalPrice += Flavor.price;
      return 0;
    });

    Item.Toppings.map((Topping) => {
      TotalPrice += Topping.price;
      return 0;
    });
    return 0;
  });

  return TotalPrice;
}

export function appInitPrinter() {
  console.log("\n\n");
  console.log("**********************************");
  console.log("Welcome to Luna's Ice Cream Shoppe");
  console.log("**********************************");
  console.log("\nFetching Menu...\n\n");
}

export function paymentPrinter(PaymentResponse) {
  console.log("\n");
  console.log("Payment Processed");
  console.log(
    "$" +
      PaymentResponse.Payment.Amount.toFixed(2) +
      " paid by " +
      PaymentResponse.Payment.network +
      " " +
      PaymentResponse.Payment.type +
      " ending with " +
      PaymentResponse.Payment.number.slice(12, 16)
  );
  console.log("Payment", PaymentResponse.Payment);
}

export function orderPrinter(SendOrderResponse) {
  console.log("\n");
  console.log(
    "Successfully Processed Order #" + SendOrderResponse.Order.Number
  );
  console.log("Order", SendOrderResponse.Order);
  console.log(
    "Placed at " +
      SendOrderResponse.Order.Time.toLocaleTimeString() +
      " on " +
      SendOrderResponse.Order.Time.toLocaleDateString()
  );
}

export function menuPrinter(Menu) {
  console.log("Servings Available:", Menu.Servings);
  console.log("Flavors Available:", Menu.Flavors);
  console.log("Toppings Available:", Menu.Toppings);
}
