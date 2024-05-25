import { useCallback } from "react";
import * as AppConfig from "../../config";
import Header from "../../Header";
import { KioskFormData, Topping } from "~/App/types";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";
import { useFormContext } from "react-hook-form";

const strings = {
  back: "Back",
  reviewOrder: "Review Order"
};

const ToppingsList = () => {
  const { watch, setValue, getValues } = useFormContext<KioskFormData>();
  const order = watch("order");
  const toppings = getValues("menu.toppings");

  const selectTopping = useCallback(
    (topping: Topping) => {
      const newToppings = [...order.currentItem.toppings];

      const toppingIndex = newToppings.findIndex((t) => t.id === topping.id);
      if (toppingIndex > -1) {
        newToppings.splice(toppingIndex, 1);
      } else {
        if (newToppings.length < order.currentItem.serving!.toppings) {
          newToppings.push(topping);
        }
      }

      setValue("order.currentItem.toppings", newToppings);
    },
    [setValue, order.currentItem.toppings, order.currentItem.serving]
  );

  const listItems = toppings.map((topping) => {
    let defaultClass = "Topping-Item";

    const hasTopping = order.currentItem.toppings.find(
      (t) => t.id === topping.id
    );

    if (hasTopping) defaultClass += " Item-selected";

    return (
      <div
        key={topping.id.toString()}
        className={defaultClass}
        onClick={() => selectTopping(topping)}
      >
        <div className="Item-title">{topping.name}</div>
        <div className="Item-desc">{topping.desc}</div>
        <div className="Item-info">
          <div className="Item-calories">{topping.calories} Calories</div>
          <div className="Item-price">${topping.price.toFixed(2)}</div>
        </div>
      </div>
    );
  });

  return <div className="Topping-container">{listItems}</div>;
};

const ToppingsStep = () => {
  const { stepHandler } = useStepHandler();
  const { watch, setValue } = useFormContext<KioskFormData>();
  const order = watch("order");

  const handleStep = useCallback(
    (gotoStep: AppConfig.Steps) => {
      if (gotoStep < AppConfig.Steps.Toppings) {
        return stepHandler(gotoStep);
      }

      let updatedOrder = { ...order };
      if (updatedOrder.currentItem.serving !== null) {
        updatedOrder.items.push(updatedOrder.currentItem);
        updatedOrder.currentItem = AppConfig.defaultCurrentItem();
      }

      setValue("order", updatedOrder);

      return stepHandler(gotoStep);
    },
    [order, stepHandler, setValue]
  );

  const prompt = `Select ${order.currentItem.serving ? order.currentItem.serving.toppings : 0} Topping${order.currentItem.serving && order.currentItem.serving.toppings <= 1 ? "" : "s"}`;

  return (
    <div className="App-header-padding">
      <Header prompt={prompt} />

      <ToppingsList />

      <div className={"Action-Container"}>
        <div className={"Step-Control"}>
          <div
            className="Button-step Button-prev"
            onClick={() => handleStep(AppConfig.Steps.Flavors)}
          >
            <i className="fa fa-chevron-left Icon-step" /> {strings.back}
          </div>

          <div
            className="Button-step Button-next"
            onClick={() => handleStep(AppConfig.Steps.Confirm)}
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
