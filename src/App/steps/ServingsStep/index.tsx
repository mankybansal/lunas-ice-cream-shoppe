import { useCallback } from "react";
import * as AppConfig from "../../config";
import Header from "../../Header";
import { Order, Serving } from "~/App/types";

const strings = {
  prompt: "What Serving Would You Like?",
  selectFlavors: "Select Flavors"
};

interface ServingsListProps {
  servings: Serving[];
  order: Order;
  orderHandler: (order: Order) => void;
}

const ServingsList = ({ servings, order, orderHandler }: ServingsListProps) => {
  const selectServing = useCallback(
    (serving: Serving) => {
      let updatedOrder = { ...order };
      updatedOrder.currentItem.serving = serving;
      updatedOrder.currentItem.flavors = updatedOrder.currentItem.flavors.slice(
        0,
        updatedOrder.currentItem.serving.scoops
      );
      updatedOrder.currentItem.toppings =
        updatedOrder.currentItem.toppings.slice(
          0,
          updatedOrder.currentItem.serving.toppings
        );

      orderHandler(updatedOrder);
    },
    [order]
  );

  const listItems = servings.map((serving) => {
    let defaultClass = "Serving-Item";
    if (
      order.currentItem.serving &&
      order.currentItem.serving.id === serving.id
    )
      defaultClass += " Item-selected";

    return (
      <div
        key={serving.id.toString()}
        className={defaultClass}
        onClick={() => selectServing(serving)}
      >
        <img className="Item-image" src={serving.image} alt="" />
        <div className="Item-title">{serving.name}</div>
        <div>{serving.desc}</div>
      </div>
    );
  });

  return <div className="Serving-container">{listItems}</div>;
};

interface ServingsStepProps {
  servings: Serving[];
  order: Order;
  orderHandler: (order: any) => void;
  stepHandler: (step: number) => void;
}

const ServingsStep = ({
  servings,
  order,
  orderHandler,
  stepHandler
}: ServingsStepProps) => {
  const handleStep = useCallback(
    (gotoStep: number) => {
      if (gotoStep === AppConfig.steps.Start) {
        stepHandler(gotoStep);
        return;
      }

      if (order.currentItem.serving) {
        orderHandler(order);
        stepHandler(gotoStep);
      } else {
        alert("Please select a serving size");
      }
    },
    [order, orderHandler, stepHandler]
  );

  return (
    <div className="App-header-padding">
      <Header prompt={strings.prompt} stepHandler={handleStep} />

      <ServingsList
        servings={servings}
        orderHandler={orderHandler}
        order={order}
      />

      <div className={"Action-Container"}>
        <div className={"Step-Control"}>
          <div
            className="Button-step Button-next"
            onClick={() => handleStep(AppConfig.steps.Flavors)}
          >
            {strings.selectFlavors}{" "}
            <i className="fa fa-chevron-right Icon-step" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServingsStep;
