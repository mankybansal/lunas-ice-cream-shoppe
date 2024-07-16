import React, { useCallback } from "react";

import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";

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
import Animations from "~/App/animations";
import { useActionButtons } from "~/App/components/ActionBar/actionBarState.atom";
import { useSetHeaderPrompt } from "~/App/components/Header/headerState.atom";
import { ArrowLeft } from "~/App/components/icons/ArrowLeft";
import { ArrowRight } from "~/App/components/icons/ArrowRight";
import * as AppConfig from "~/App/config";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import { Flavor, KioskFormData } from "~/App/types";
import { useSetAtom } from "jotai/index";
import { confirmationModalStateAtom } from "~/App/components/ConfirmationModal/confirmationModalState.atom.ts";

const strings = {
  selectToppings: "Select Toppings",
  back: "Back",
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
  color: #8b4513;
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
    [selectedFlavors, selectedServing.scoops, setValue]
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

  // Round up to nearest 3.
  const emptyItems = new Array(3 - (flavors.length % 3)).fill(null);

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
            {...Animations.AnimateInUp}
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
      {emptyItems.map((_, i) => (
        <EmptyItem key={`empty-${i}`} />
      ))}
    </ItemsContainer>
  );
};

const FlavorsStep = () => {
  const { stepHandler } = useStepHandler();
  const setConfirmationModalState = useSetAtom(confirmationModalStateAtom);

  const { watch, setValue } = useFormContext<KioskFormData>();
  const order = watch("order");

  const handleStep = useCallback(
    (gotoStep: number) => {
      if (gotoStep < (AppConfig.Steps.Flavors as number)) {
        return stepHandler(gotoStep);
      }

      if (order.currentItem.flavors.length > 0) {
        setValue("order", order);
        return stepHandler(gotoStep);
      }

      setConfirmationModalState({
        isVisible: true,
        onConfirm: () => {},
        title: "Select a Flavor",
        content: "You must select at least one flavor before proceeding.",
        cancelText: undefined,
        onCancel: undefined,
        confirmText: "OK"
      });
    },
    [order, setConfirmationModalState, stepHandler, setValue]
  );

  const maxScoops = order.currentItem.serving!.scoops;
  useSetHeaderPrompt(strings.prompt(maxScoops));

  useActionButtons({
    next: {
      label: strings.selectToppings,
      onClick: () => handleStep(AppConfig.Steps.Toppings),
      icon: <ArrowRight />
    },
    back: {
      label: strings.back,
      onClick: () => handleStep(AppConfig.Steps.Servings),
      icon: <ArrowLeft />
    }
  });

  return <FlavorsList />;
};

export default FlavorsStep;
