import { useCallback } from "react";
import * as AppConfig from "../../config";
import Header from "../../Header";
import { KioskFormData, Serving } from "~/App/types";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";
import { useFormContext } from "react-hook-form";

const strings = {
  prompt: "What Serving Would You Like?",
  selectFlavors: "Select Flavors"
};

const ServingsList = () => {
  const { watch, setValue, getValues } = useFormContext<KioskFormData>();
  const order = watch("order");
  const servings = getValues("menu.servings");

  const selectServing = useCallback(
    (serving: Serving) => {
      setValue("order.currentItem.serving", serving);

      // Remove flavors and toppings if they exceed the serving size.
      setValue(
        "order.currentItem.flavors",
        order.currentItem.flavors.splice(0, serving.scoops)
      );

      // Remove toppings if they exceed the serving size.
      setValue(
        "order.currentItem.toppings",
        order.currentItem.toppings.splice(0, serving.toppings)
      );
    },
    [setValue, order.currentItem.flavors, order.currentItem.toppings]
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

  return (
    <div className="App-header-padding">
      <Header prompt={strings.prompt} stepHandler={handleStep} />

      <ServingsList />

      <div className={"Action-Container"}>
        <div className={"Step-Control"}>
          <div
            className="Button-step Button-next"
            onClick={() => handleStep(AppConfig.Steps.Flavors)}
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
