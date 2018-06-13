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