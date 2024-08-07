import pluralize from "pluralize";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import * as AppConfig from "~/App/config";

import { useActionButtons } from "~/App/components/ActionBar/actionBarState.atom";
import Animations from "~/App/animations";
import { ArrowLeft } from "~/App/components/icons/ArrowLeft";
import { ShoppingCart } from "~/App/components/icons/ShoppingCart";
import { useSetHeaderPrompt } from "~/App/components/Header/headerState.atom";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import {
  EmptyItem,
  ItemCalories,
  ItemContainer,
  ItemDescription,
  ItemPrice,
  ItemPrimaryInfo,
  ItemsContainer,
  ItemSecondaryInfo,
  ItemTitle
} from "~/App/Styled";
import { KioskFormData, Topping } from "~/App/types";
import { useAtomValue } from "jotai";
import { rendererAtom } from "~/App/components/IceCreamRenderer/renderer.atom.ts";

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

      if (newToppings.length >= selectedServing.toppings) {
        // If there is more than 1 topping, we don't know how to replace.
        if (selectedServing.toppings > 1) return;

        // If there is only 1 topping, we replace it.
        newToppings.pop();
      }

      newToppings.push(topping);
      setValue("order.currentItem.toppings", newToppings);
    },
    [selectedToppings, selectedServing.toppings, setValue]
  );

  // Round up to nearest 3.
  const emptyItems = new Array(3 - (toppings.length % 3)).fill(null);

  return (
    <ItemsContainer>
      {toppings.map((topping) => {
        const isSelected = !!selectedToppings.find(
          ({ id }) => id === topping.id
        );
        return (
          <ItemContainer
            {...Animations.AnimateInUp}
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
      {emptyItems.map((_, i) => (
        <EmptyItem key={`empty-${i}`} />
      ))}
    </ItemsContainer>
  );
};

const ToppingsStep = () => {
  const { stepHandler } = useStepHandler();
  const { watch, setValue } = useFormContext<KioskFormData>();
  const order = watch("order");
  const rendererState = useAtomValue(rendererAtom);

  const handleStep = useCallback(
    (gotoStep: AppConfig.Steps) => {
      if (gotoStep < AppConfig.Steps.Toppings) {
        return stepHandler(gotoStep);
      }

      const updatedOrder = { ...order };
      if (updatedOrder.currentItem.serving !== null) {
        updatedOrder.currentItem.imageSrc =
          rendererState.renderer?.domElement.toDataURL();
        updatedOrder.items.push(updatedOrder.currentItem);

        updatedOrder.currentItem = AppConfig.defaultCurrentItem();
      }

      setValue("order", updatedOrder);

      return stepHandler(gotoStep);
    },
    [order, setValue, stepHandler, rendererState.renderer?.domElement]
  );

  const maxToppings = order.currentItem.serving!.toppings;
  useSetHeaderPrompt(strings.prompt(maxToppings));

  useActionButtons({
    next: {
      label: strings.reviewOrder,
      onClick: () => handleStep(AppConfig.Steps.Confirm),
      icon: <ShoppingCart />
    },
    back: {
      label: strings.back,
      onClick: () => handleStep(AppConfig.Steps.Flavors),
      icon: <ArrowLeft />
    }
  });

  return <ToppingsList />;
};

export default ToppingsStep;
