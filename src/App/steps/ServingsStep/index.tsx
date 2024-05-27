import { useCallback } from "react";
import * as AppConfig from "../../config";

import { KioskFormData, Serving } from "~/App/types";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";
import { useFormContext } from "react-hook-form";
import {
  EmptyItem,
  ItemContainer,
  ItemDescription,
  ItemImage,
  ItemPrimaryInfo,
  ItemsContainer,
  ItemTitle
} from "~/App/Styled.ts";
import { useSetHeaderPrompt } from "~/App/Header/headerState.atom";
import { useActionButtons } from "~/App/ActionBar/actionBarState.atom.ts";
import Animations from "~/App/animations.ts";

const strings = {
  prompt: "What Serving Would You Like?",
  selectFlavors: "Select Flavors"
};

const ServingsList = () => {
  const { watch, setValue, getValues } = useFormContext<KioskFormData>();
  const order = watch("order");
  const servings = getValues("menu.servings");

  const selectedFlavors = order.currentItem.flavors;
  const selectedToppings = order.currentItem.toppings;
  const selectedServing = order.currentItem.serving!;

  const selectServing = useCallback(
    (serving: Serving) => {
      setValue("order.currentItem.serving", serving);

      // Remove flavors and toppings if they exceed the serving size.
      setValue(
        "order.currentItem.flavors",
        selectedFlavors.splice(0, serving.scoops)
      );

      // Remove toppings if they exceed the serving size.
      setValue(
        "order.currentItem.toppings",
        selectedToppings.splice(0, serving.toppings)
      );
    },
    [setValue, selectedFlavors, selectedToppings]
  );

  // Round up to nearest 3.
  const emptyItems = new Array(3 - (servings.length % 3)).fill(null);

  return (
    <ItemsContainer>
      {servings.map((serving) => {
        const isSelected = selectedServing?.id === serving.id;
        return (
          <ItemContainer
            {...Animations.AnimateInUp}
            key={serving.id.toString()}
            selected={isSelected}
            onClick={() => selectServing(serving)}
          >
            <ItemPrimaryInfo style={{ alignItems: "center" }}>
              <ItemImage src={serving.image} alt="" />
              <ItemTitle>{serving.name}</ItemTitle>
              <ItemDescription>{serving.desc}</ItemDescription>
            </ItemPrimaryInfo>
          </ItemContainer>
        );
      })}
      {selectedServing &&
        emptyItems.map((_, i) => <EmptyItem key={`empty-${i}`} />)}
    </ItemsContainer>
  );
};

const ServingsStep = () => {
  const { setValue, watch } = useFormContext<KioskFormData>();
  const { stepHandler } = useStepHandler();

  const order = watch("order");

  const handleStep = useCallback(
    (gotoStep: number) => {
      if (gotoStep === AppConfig.Steps.Start) {
        return stepHandler(gotoStep);
      }

      if (order.currentItem.serving) {
        setValue("order", order);

        return stepHandler(gotoStep);
      } else {
        alert("Please select a serving size");
      }
    },
    [order, stepHandler, setValue]
  );

  useSetHeaderPrompt(strings.prompt);

  useActionButtons({
    next: {
      label: strings.selectFlavors,
      onClick: () => handleStep(AppConfig.Steps.Flavors),
      icon: <i className="fa fa-chevron-right Icon-step" />
    }
  });

  return <ServingsList />;
};

export default ServingsStep;
