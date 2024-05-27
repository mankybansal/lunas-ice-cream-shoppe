import { useCallback } from "react";
import * as AppConfig from "../../config";
import { KioskFormData, Topping } from "~/App/types";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import { useFormContext } from "react-hook-form";
import pluralize from "pluralize";
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
import { useSetHeaderPrompt } from "~/App/Header/headerState.atom";
import { useActionButtons } from "~/App/ActionBar/actionBarState.atom.ts";

const strings = {
  back: "Back",
  reviewOrder: "Review Order",
  prompt: (maxToppings: number) =>
    `Select Up To ${maxToppings} ${pluralize("Topping", maxToppings)}`
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

  const maxToppings = order.currentItem.serving!.toppings;
  useSetHeaderPrompt(strings.prompt(maxToppings));

  useActionButtons({
    next: {
      label: strings.reviewOrder,
      onClick: () => handleStep(AppConfig.Steps.Confirm),
      icon: <i className="fa fa-shopping-cart Icon-step" />
    },
    back: {
      label: strings.back,
      onClick: () => handleStep(AppConfig.Steps.Toppings),
      icon: <i className="fa fa-chevron-left Icon-step" />
    }
  });

  return <ToppingsList />;
};

export default ToppingsStep;
