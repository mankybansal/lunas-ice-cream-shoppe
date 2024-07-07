import { useFormContext } from "react-hook-form";
import * as AppConfig from "~/App/config";
import { defaultCurrentItem } from "~/App/config";
import { useAppInit } from "./useAppInit";
import { KioskFormData } from "~/App/types";

export const useStepHandler = () => {
  const { reset, setValue, watch } = useFormContext<KioskFormData>();
  const { appInit } = useAppInit();

  const currentStep = watch("currentStep");

  const stepHandler = async (gotoStep: number) => {
    if (gotoStep === AppConfig.Steps.Start) {
      reset();
      return appInit();
    }

    setValue("currentStep", gotoStep);
  };

  const createNewItem = async () => {
    await stepHandler(AppConfig.Steps.Servings);
    setValue("order.currentItem", defaultCurrentItem());
  };

  return { stepHandler, currentStep, createNewItem };
};
