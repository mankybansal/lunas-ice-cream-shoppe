import React, { useCallback } from "react";
import * as AppConfig from "../../config";
import Header from "../../Header";
import { Flavor, Order } from "~/App/types";

const strings = {
  selectToppings: "Select Toppings",
  back: "Back",
  selectAtLeastOneScoop: "Select at least one scoop"
};

interface FlavorsListProps {
  flavors: Flavor[];
  order: Order;
  orderHandler: (order: Order) => void;
}

const FlavorsList = ({ flavors, order, orderHandler }: FlavorsListProps) => {
  const selectFlavor = useCallback(
    (flavor: Flavor) => {
      let updatedOrder = { ...order };
      if (
        updatedOrder.currentItem.flavors.length <
        updatedOrder.currentItem.serving.scoops
      ) {
        updatedOrder.currentItem.flavors.push(flavor);
      }
      orderHandler(updatedOrder);
    },
    [order]
  );

  const removeFlavor = useCallback(
    (flavor: Flavor, e: React.MouseEvent) => {
      e.stopPropagation();
      let updatedOrder = { ...order };
      const index = updatedOrder.currentItem.flavors.indexOf(flavor);
      if (index > -1) {
        updatedOrder.currentItem.flavors.splice(index, 1);
      }
      orderHandler(updatedOrder);
    },
    [order]
  );

  const listItems = flavors.map((flavor) => {
    let flavorCount = 0;
    let defaultClass = "Flavor-Item";
    const flavorCountMax = order.currentItem.serving.scoops;

    if (
      order.currentItem.flavors.length > 0 &&
      order.currentItem.flavors.includes(flavor)
    ) {
      defaultClass += " Item-selected";
      order.currentItem.flavors.forEach((testFlavor: Flavor) => {
        if (testFlavor === flavor) flavorCount++;
      });
    }

    return (
      <div
        key={flavor.id.toString()}
        className={defaultClass}
        onClick={() => selectFlavor(flavor)}
      >
        <div className="Item-title">{flavor.name}</div>
        <div className="Item-desc">{flavor.desc}</div>
        <div className="Item-info">
          <div className="Item-calories">{flavor.calories} Calories</div>
          <div className="Item-price">${flavor.price.toFixed(2)}</div>
        </div>

        {flavorCount > 0 ? (
          <div className="MultiScoop-container">
            <div className="MultiScoop-selected"> {flavorCount} Scoop(s)</div>
            <div
              className={
                flavorCount < flavorCountMax &&
                order.currentItem.flavors.length < flavorCountMax
                  ? "MultiScoop-selected MultiScoop-action"
                  : "MultiScoop-selected MultiScoop-action-disabled"
              }
            >
              Add
            </div>
            <div
              className="MultiScoop-selected MultiScoop-action"
              onClick={(e) => removeFlavor(flavor, e)}
            >
              Remove
            </div>
          </div>
        ) : null}
      </div>
    );
  });

  return <div className="Flavor-container">{listItems}</div>;
};

interface FlavorsStepProps {
  flavors: Flavor[];
  order: Order;
  orderHandler: (order: Order) => void;
  stepHandler: (step: number) => void;
}

const FlavorsStep = ({
  flavors,
  order,
  orderHandler,
  stepHandler
}: FlavorsStepProps) => {
  const handleStep = useCallback(
    (gotoStep: number) => {
      if (gotoStep < AppConfig.steps.Flavors) {
        stepHandler(gotoStep);
      } else {
        if (order.currentItem.flavors.length > 0) {
          orderHandler(order);
          stepHandler(gotoStep);
        } else {
          alert(strings.selectAtLeastOneScoop);
        }
      }
    },
    [order, orderHandler, stepHandler]
  );

  const prompt = `Select Up To ${
    order.currentItem.serving ? order.currentItem.serving.scoops : 0
  } Flavors`;

  return (
    <div className="App-header-padding">
      <Header prompt={prompt} stepHandler={handleStep} />

      <FlavorsList
        flavors={flavors}
        orderHandler={orderHandler}
        order={order}
      />
      <div className={"Action-Container"}>
        <div className={"Step-Control"}>
          <div
            className="Button-step Button-prev"
            onClick={() => handleStep(AppConfig.steps.Servings)}
          >
            <i className="fa fa-chevron-left Icon-step" /> {strings.back}
          </div>

          <div
            className="Button-step Button-next"
            onClick={() => handleStep(AppConfig.steps.Toppings)}
          >
            {strings.selectToppings}{" "}
            <i className="fa fa-chevron-right Icon-step" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorsStep;
