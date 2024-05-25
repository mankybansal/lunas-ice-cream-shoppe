import React, { useCallback } from "react";
import * as AppConfig from "../../config";
import Header from "../../Header";
import { Flavor, KioskFormData } from "~/App/types";
import { useFormContext } from "react-hook-form";
import { useStepHandler } from "~/App/hooks/useStepHandler";

const strings = {
  selectToppings: "Select Toppings",
  back: "Back",
  selectAtLeastOneScoop: "Select at least one scoop"
};

const FlavorsList = () => {
  const { watch, setValue, getValues } = useFormContext<KioskFormData>();
  const order = watch("order");
  const flavors = getValues("menu.flavors");

  const selectFlavor = useCallback(
    (flavor: Flavor) => {
      const newFlavors = [...order.currentItem.flavors];

      if (newFlavors.length < order.currentItem.serving!.scoops) {
        newFlavors.push(flavor);
      }

      setValue("order.currentItem.flavors", newFlavors);
    },
    [setValue, order.currentItem.flavors, order.currentItem.serving]
  );

  const removeFlavor = useCallback(
    (flavor: Flavor, e: React.MouseEvent) => {
      e.stopPropagation();

      const newFlavors = [...order.currentItem.flavors];
      const index = newFlavors.findIndex((f) => f.id === flavor.id);
      if (index > -1) newFlavors.splice(index, 1);

      setValue("order.currentItem.flavors", newFlavors);
    },
    [setValue, order.currentItem.flavors]
  );

  const listItems = flavors.map((flavor) => {
    const currentFlavorSelections = order.currentItem.flavors.filter(
      (f) => f.id === flavor.id
    );

    let flavorCount = currentFlavorSelections.length;
    let defaultClass = "Flavor-Item";
    const flavorCountMax = order.currentItem.serving!.scoops;

    if (order.currentItem.flavors.length > 0 && flavorCount > 0) {
      defaultClass += " Item-selected";
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

const FlavorsStep = () => {
  const { stepHandler } = useStepHandler();

  const { watch, setValue } = useFormContext<KioskFormData>();
  const order = watch("order");

  const handleStep = useCallback(
    (gotoStep: number) => {
      if (gotoStep < AppConfig.steps.Flavors) {
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

  const prompt = `Select Up To ${
    order.currentItem.serving ? order.currentItem.serving.scoops : 0
  } Flavors`;

  return (
    <div className="App-header-padding">
      <Header prompt={prompt} stepHandler={handleStep} />

      <FlavorsList />
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
