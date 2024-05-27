import React, { useCallback } from "react";
import * as AppConfig from "../../config";
import { Flavor, KioskFormData } from "~/App/types";
import { useFormContext } from "react-hook-form";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import styled from "@emotion/styled";

import {
  ItemCalories,
  ItemContainer,
  ItemDescription,
  ItemPrice,
  ItemPrimaryInfo,
  ItemsContainer,
  ItemSecondaryInfo,
  ItemTitle
} from "~/App/Styled";
import { useSetHeaderPrompt } from "~/App/Header/prompt.atom.ts";

const strings = {
  selectToppings: "Select Toppings",
  back: "Back",
  selectAtLeastOneScoop: "Select at least one scoop",
  prompt: (maxScoops: number) => `Select Up To ${maxScoops} Flavors`
};

const ActionContainer = styled.div<{ visible: boolean }>`
  margin-top: auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const ActionText = styled.div`
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
`;

const Action = styled(ActionText)<{ disabled?: boolean; selected?: boolean }>`
  display: flex;
  flex: 1;
  padding: 16px 32px;
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
  color: ${({ selected }) => (selected ? "cornflowerblue" : "#555")};

  :first-of-type {
    justify-content: flex-start;
  }

  :last-of-type {
    justify-content: flex-end;
  }
`;

const ScoopCount = styled(ActionText)`
  color: cornflowerblue;
`;

const FlavorsList = () => {
  const { watch, setValue, getValues } = useFormContext<KioskFormData>();
  const order = watch("order");
  const flavors = getValues("menu.flavors");

  const selectedFlavors = order.currentItem.flavors;
  const selectedServing = order.currentItem.serving!;

  const selectFlavor = useCallback(
    (flavor: Flavor) => () => {
      const newFlavors = [...selectedFlavors];
      if (newFlavors.length >= selectedServing.scoops) return;
      newFlavors.push(flavor);
      setValue("order.currentItem.flavors", newFlavors);
    },
    [setValue, selectedFlavors]
  );

  const removeFlavor = useCallback(
    (flavor: Flavor) => (e: React.MouseEvent) => {
      e.stopPropagation();
      const newFlavors = [...selectedFlavors];
      const index = newFlavors.findIndex(({ id }) => id === flavor.id);
      if (index < 0) return;
      newFlavors.splice(index, 1);
      setValue("order.currentItem.flavors", newFlavors);
    },
    [setValue, selectedFlavors]
  );

  return (
    <ItemsContainer>
      {flavors.map((flavor) => {
        const currentFlavorCount = selectedFlavors.filter(
          ({ id }) => id === flavor.id
        ).length;
        const maxFlavorCount = selectedServing.scoops;

        const isSelected = selectedFlavors.length > 0 && currentFlavorCount > 0;
        const isAddDisabled =
          currentFlavorCount >= maxFlavorCount ||
          selectedFlavors.length >= maxFlavorCount;

        return (
          <ItemContainer
            key={flavor.id}
            selected={isSelected}
            onClick={selectFlavor(flavor)}
          >
            <ItemPrimaryInfo>
              <ItemTitle>{flavor.name}</ItemTitle>
              <ItemDescription>{flavor.desc}</ItemDescription>
            </ItemPrimaryInfo>
            <ItemSecondaryInfo>
              <ItemCalories>{flavor.calories} Calories</ItemCalories>
              <ItemPrice>${flavor.price.toFixed(2)}</ItemPrice>
            </ItemSecondaryInfo>
            <ActionContainer visible={currentFlavorCount > 0}>
              <Action onClick={removeFlavor(flavor)}>Remove</Action>
              <ScoopCount> {currentFlavorCount} Scoop(s)</ScoopCount>
              <Action disabled={isAddDisabled}>Add</Action>
            </ActionContainer>
          </ItemContainer>
        );
      })}
    </ItemsContainer>
  );
};

const FlavorsStep = () => {
  const { stepHandler } = useStepHandler();

  const { watch, setValue } = useFormContext<KioskFormData>();
  const order = watch("order");

  const handleStep = useCallback(
    (gotoStep: number) => {
      if (gotoStep < AppConfig.Steps.Flavors) {
        return stepHandler(gotoStep);
      }

      if (order.currentItem.flavors.length > 0) {
        setValue("order", order);
        return stepHandler(gotoStep);
      }

      alert(strings.selectAtLeastOneScoop);
    },
    [order, stepHandler, setValue]
  );

  const maxScoops = order.currentItem.serving!.scoops;
  useSetHeaderPrompt(strings.prompt(maxScoops));

  return (
    <>
      <FlavorsList />
      <div className={"Action-Container"}>
        <div className={"Step-Control"}>
          <div
            className="Button-step Button-prev"
            onClick={() => handleStep(AppConfig.Steps.Servings)}
          >
            <i className="fa fa-chevron-left Icon-step" /> {strings.back}
          </div>

          <div
            className="Button-step Button-next"
            onClick={() => handleStep(AppConfig.Steps.Toppings)}
          >
            {strings.selectToppings}{" "}
            <i className="fa fa-chevron-right Icon-step" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlavorsStep;
