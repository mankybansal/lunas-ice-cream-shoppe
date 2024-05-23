import React, { useCallback } from "react";
import * as AppConfig from "../../config";
import Header from "../../Header";
import { Order, Topping } from "~/App/types";

const strings = {
  back: "Back",
  reviewOrder: "Review Order"
};

interface ToppingsListProps {
  toppings: Topping[];
  order: Order;
  orderHandler: (order: Order) => void;
}

const ToppingsList: React.FC<ToppingsListProps> = ({
  toppings,
  order,
  orderHandler
}) => {
  const selectTopping = useCallback(
    (topping: Topping) => {
      let updatedOrder = { ...order };

      if (updatedOrder.currentItem.toppings.includes(topping)) {
        updatedOrder.currentItem.toppings.splice(
          updatedOrder.currentItem.toppings.indexOf(topping),
          1
        );
      } else {
        if (
          updatedOrder.currentItem.toppings.length <
          updatedOrder.currentItem.serving.toppings
        ) {
          updatedOrder.currentItem.toppings.push(topping);
        }
      }

      orderHandler(updatedOrder);
    },
    [order, orderHandler]
  );

  const listItems = toppings.map((Topping) => {
    let defaultClass = "Topping-Item";
    if (
      order.currentItem.toppings.length > 0 &&
      order.currentItem.toppings.includes(Topping)
    ) {
      defaultClass += " Item-selected";
    }

    return (
      <div
        key={Topping.id.toString()}
        className={defaultClass}
        onClick={() => selectTopping(Topping)}
      >
        <div className="Item-title">{Topping.name}</div>
        <div className="Item-desc">{Topping.desc}</div>
        <div className="Item-info">
          <div className="Item-calories">{Topping.calories} Calories</div>
          <div className="Item-price">${Topping.price.toFixed(2)}</div>
        </div>
      </div>
    );
  });

  return <div className="Topping-container">{listItems}</div>;
};

interface ToppingsStepProps extends ToppingsListProps {
  priceHandler: () => void;
  stepHandler: (step: number) => void;
}

const ToppingsStep = ({
  toppings,
  order,
  orderHandler,
  priceHandler,
  stepHandler
}: ToppingsStepProps) => {
  const handleStep = useCallback(
    (gotoStep: number) => {
      if (gotoStep < AppConfig.steps.Toppings) {
        stepHandler(gotoStep);
      } else {
        let updatedOrder = { ...order };
        if (updatedOrder.currentItem.serving !== null) {
          updatedOrder.items.push(updatedOrder.currentItem);
          updatedOrder.currentItem = AppConfig.defaultCurrentItem();
        }

        priceHandler();
        orderHandler(updatedOrder);
        stepHandler(gotoStep);
      }
    },
    [order, priceHandler, stepHandler]
  );

  const prompt = `Select ${order.currentItem.serving ? order.currentItem.serving.toppings : 0} Topping${order.currentItem.serving && order.currentItem.serving.toppings <= 1 ? "" : "s"}`;

  return (
    <div className="App-header-padding">
      <Header prompt={prompt} stepHandler={handleStep} />

      <ToppingsList
        toppings={toppings}
        orderHandler={orderHandler}
        order={order}
      />

      <div className={"Action-Container"}>
        <div className={"Step-Control"}>
          <div
            className="Button-step Button-prev"
            onClick={() => handleStep(AppConfig.steps.Flavors)}
          >
            <i className="fa fa-chevron-left Icon-step" /> {strings.back}
          </div>

          <div
            className="Button-step Button-next"
            onClick={() => handleStep(AppConfig.steps.Confirm)}
          >
            {strings.reviewOrder}{" "}
            <i className="fa fa-shopping-cart Icon-step" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToppingsStep;
