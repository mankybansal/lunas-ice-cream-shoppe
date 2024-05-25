import { useCallback } from "react";
import * as AppConfig from "../../config";
import Header from "../../Header";
import { Flavor, Item, KioskFormData, Topping } from "~/App/types.ts";
import * as Helpers from "~/App/utils.ts";
import { useFormContext } from "react-hook-form";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";

const strings = {
  reviewOrder: "Review Order",
  orderTotal: "Your Order Total Is: ",
  addItem: "Add Another Item",
  checkout: "Checkout",
  remove: "Remove",
  scoops: "Scoops",
  toppings: "Toppings"
};

interface FlavorProps {
  flavors: Flavor[];
}

const Flavors = ({ flavors }: FlavorProps) => (
  <div>
    {flavors.map((flavor, i) => (
      <div key={i} className="Order-Item-container">
        <div className="Order-Item-title-container">{flavor.name}</div>
        <div className="Order-Item-price-container">
          ${flavor.price.toFixed(2)}
        </div>
      </div>
    ))}
  </div>
);

interface ToppingProps {
  toppings: Topping[];
}

const Toppings = ({ toppings }: ToppingProps) => (
  <div>
    {toppings.map((topping, i) => (
      <div key={i} className="Order-Item-container">
        <div className="Order-Item-title-container">{topping.name}</div>
        <div className="Order-Item-price-container">
          ${topping.price.toFixed(2)}
        </div>
      </div>
    ))}
  </div>
);

const OrderList = () => {
  const { watch, setValue } = useFormContext<KioskFormData>();
  const order = watch("order");
  const { stepHandler } = useStepHandler();

  const removeItem = useCallback(
    (item: Item) => {
      let updatedOrder = { ...order };

      if (updatedOrder.items.includes(item))
        updatedOrder.items.splice(updatedOrder.items.indexOf(item), 1);

      setValue("order", updatedOrder);

      if (updatedOrder.items.length < 1) {
        return stepHandler(AppConfig.Steps.Servings);
      }
    },
    [order, stepHandler, setValue]
  );

  const listItems = order.items.map((item: Item, i) => (
    <div key={i} className="Order-Item">
      <img className="Item-image" src={item.serving!.image} alt="" />
      <div className="Item-title">{item.serving!.name}</div>
      <div className="Item-category">{strings.scoops}</div>
      <Flavors flavors={item.flavors} />
      {item.toppings.length > 0 && (
        <div className="Item-category">{strings.toppings}</div>
      )}
      <Toppings toppings={item.toppings} />
      <div className="Order-action-remove" onClick={() => removeItem(item)}>
        {strings.remove}
      </div>
    </div>
  ));

  return <div className="Order-container">{listItems}</div>;
};

const ConfirmStep = () => {
  const { stepHandler } = useStepHandler();
  const { watch } = useFormContext<KioskFormData>();

  const order = watch("order");
  const totalPrice = Helpers.calculatePrice(order);

  const prompt = strings.reviewOrder;

  return (
    <div className="App-header-padding">
      <Header prompt={prompt} />

      <OrderList />

      <div className={"Action-Container"}>
        <div className="Payment-breakup-container">
          <i className="fa fa-shopping-cart Icon-step Icon-step-right" />
          {strings.orderTotal} &nbsp;&nbsp;
          <span style={{ color: "black" }}>${totalPrice.toFixed(2)}</span>
        </div>

        <div className={"Step-Control"}>
          <div
            className="Button-step Button-prev"
            onClick={() => stepHandler(AppConfig.Steps.Servings)}
          >
            <i className="fa fa-plus Icon-step" /> {strings.addItem}
          </div>

          <div
            className="Button-step Button-next"
            onClick={() => stepHandler(AppConfig.Steps.Payment)}
          >
            {strings.checkout} <i className="fa fa-check Icon-step" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmStep;
