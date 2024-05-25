import { useFormContext } from "react-hook-form";
import * as AppConfig from "~/App/config.ts";
import { useAppInit } from "./useAppInit";
import { KioskFormData } from "~/App/types.ts";

export const useStepHandler = () => {
  const { reset, setValue, watch } = useFormContext<KioskFormData>();
  const { appInit } = useAppInit();

  const currentStep = watch("currentStep");

  const stepHandler = async (gotoStep: AppConfig.Steps) => {
    if (gotoStep === AppConfig.Steps.Start) {
      reset();
      return appInit();
    }

    setValue("currentStep", gotoStep);
  };

  return { stepHandler, currentStep };
};
