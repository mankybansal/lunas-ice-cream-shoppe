import { useEffect } from "react";
import "./App.css";
import "./styles/Containers.css";
import "./styles/Interactions.css";
import "./styles/Buttons.css";
import "./styles/Icons.css";
import {
  StartStep,
  ServingsStep,
  FlavorsStep,
  ToppingsStep,
  ConfirmStep,
  PaymentStep,
  FinishStep
} from "./steps";
import * as AppConfig from "./config";

import { KioskFormData } from "./types";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useAppInit } from "~/App/hooks/useAppInit.ts";

const IceCreamKiosk = () => {
  const formMethods = useForm<KioskFormData>({
    defaultValues: {
      menu: AppConfig.defaultState().menu,
      order: AppConfig.defaultState().order,
      currentStep: AppConfig.Steps.Start,
      completedOrder: null,
      totalPrice: 0
    }
  });

  return (
    <FormProvider {...formMethods}>
      <KioskContent />
    </FormProvider>
  );
};

const KioskContent = () => {
  const { watch } = useFormContext<KioskFormData>();
  const { appInit } = useAppInit();

  useEffect(() => {
    void appInit();
  }, [appInit]);

  const currentStep = watch("currentStep");

  return (
    <div className="App">
      {currentStep === AppConfig.Steps.Start && <StartStep />}
      {currentStep === AppConfig.Steps.Servings && <ServingsStep />}
      {currentStep === AppConfig.Steps.Flavors && <FlavorsStep />}
      {currentStep === AppConfig.Steps.Toppings && <ToppingsStep />}
      {currentStep === AppConfig.Steps.Confirm && <ConfirmStep />}
      {currentStep === AppConfig.Steps.Payment && <PaymentStep />}
      {currentStep === AppConfig.Steps.Finish && <FinishStep />}
    </div>
  );
};

export default IceCreamKiosk;
