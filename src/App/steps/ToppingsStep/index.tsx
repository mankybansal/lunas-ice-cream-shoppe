import { useCallback } from "react";
import * as AppConfig from "../../config";
import Header from "../../Header";
import { KioskFormData, Topping } from "~/App/types";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";
import { useFormContext } from "react-hook-form";
import {
  ItemCalories,
  ItemContainer,
  ItemDescription,
  ItemPrice,
  ItemPrimaryInfo,
  ItemsContainer,
  ItemSecondaryInfo,
  ItemTitle
} from "~/App/Styled.ts";

const strings = {
  back: "Back",
  reviewOrder: "Review Order"
};

const ToppingsList = () => {
  const { watch, setValue, getValues } = useFormContext<KioskFormData>();
  const order = watch("order");
  const toppings = getValues("menu.toppings");

  const selectedToppings = order.currentItem.toppings;
  const selectedServing = order.currentItem.serving!;

  const selectTopping = useCallback(
    (topping: Topping) => {
      const newToppings = [...selectedToppings];

      const toppingIndex = newToppings.findIndex(({ id }) => id === topping.id);

      if (toppingIndex > -1) {
        newToppings.splice(toppingIndex, 1);
        setValue("order.currentItem.toppings", newToppings);
        return;
      }

      if (newToppings.length >= selectedServing.toppings) return;

      newToppings.push(topping);
      setValue("order.currentItem.toppings", newToppings);
    },
    [setValue, selectedToppings]
  );

  return (
    <ItemsContainer>
      {toppings.map((topping) => {
        const isSelected = !!selectedToppings.find(
          ({ id }) => id === topping.id
        );
        return (
          <ItemContainer
            key={topping.id.toString()}
            selected={isSelected}
            onClick={() => selectTopping(topping)}
          >
            <ItemPrimaryInfo>
              <ItemTitle>{topping.name}</ItemTitle>
              <ItemDescription>{topping.desc}</ItemDescription>
            </ItemPrimaryInfo>
            <ItemSecondaryInfo>
              <ItemCalories>{topping.calories} Calories</ItemCalories>
              <ItemPrice>${topping.price.toFixed(2)}</ItemPrice>
            </ItemSecondaryInfo>
          </ItemContainer>
        );
      })}
    </ItemsContainer>
  );
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
