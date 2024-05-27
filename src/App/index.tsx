import { useEffect, useMemo } from "react";

import "./styles/Containers.css";
import "./styles/Interactions.css";
import "./styles/Buttons.css";
import "./styles/Icons.css";
import {
  ConfirmStep,
  FinishStep,
  FlavorsStep,
  PaymentStep,
  ServingsStep,
  StartStep,
  ToppingsStep
} from "./steps";
import * as AppConfig from "./config";

import { KioskFormData } from "./types";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useAppInit } from "~/App/hooks/useAppInit";
import { IceCreamRenderer } from "~/App/IceCreamRenderer";
import styled from "@emotion/styled";
import Header from "~/App/Header";
import { ActionBar } from "~/App/ActionBar";

const RootContainer = styled.div`
  text-align: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  display: flex;
  background: #fff5e1;
`;

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

const getRandomFlavors = (scoops: number): string[] => {
  const selectedFlavors = new Set<string>();
  while (selectedFlavors.size < scoops) {
    const randomIndex = Math.floor(Math.random() * 8) + 1;
    selectedFlavors.add("FLA" + randomIndex.toString());
  }
  return Array.from(selectedFlavors);
};

const getRandomServing = (): string => {
  const randomIndex = Math.floor(Math.random() * 2) + 1;
  return "SER" + randomIndex.toString();
};

const KioskContent = () => {
  const { watch } = useFormContext<KioskFormData>();
  const { appInit } = useAppInit();

  useEffect(() => {
    void appInit();
  }, [appInit]);

  const serving = watch("order.currentItem.serving");
  const selectedServing = useMemo(
    () => (serving ? serving.id : getRandomServing()),
    [serving]
  );

  const randomFlavors = useMemo(
    () => getRandomFlavors(selectedServing === "SER1" ? 3 : 2),
    [selectedServing]
  );

  const currentStep = watch("currentStep");
  const selectedScoops = watch("order.currentItem.flavors").map((f) => f.id);

  const scoopsToShow =
    currentStep === AppConfig.Steps.Start ? randomFlavors : selectedScoops;

  const shouldShowRenderer = currentStep < AppConfig.Steps.Confirm;
  const shouldShowHeader = currentStep !== AppConfig.Steps.Start;
  const shouldShowActionBar =
    currentStep !== AppConfig.Steps.Finish &&
    currentStep !== AppConfig.Steps.Payment &&
    currentStep !== AppConfig.Steps.Start;

  return (
    <RootContainer>
      {shouldShowHeader && <Header />}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {shouldShowRenderer && (
          <IceCreamRenderer
            scoopsToShow={scoopsToShow}
            serving={selectedServing}
          />
        )}
        {currentStep === AppConfig.Steps.Start && <StartStep />}
        {currentStep === AppConfig.Steps.Servings && <ServingsStep />}
        {currentStep === AppConfig.Steps.Flavors && <FlavorsStep />}
        {currentStep === AppConfig.Steps.Toppings && <ToppingsStep />}
        {currentStep === AppConfig.Steps.Confirm && <ConfirmStep />}
        {currentStep === AppConfig.Steps.Payment && <PaymentStep />}
        {currentStep === AppConfig.Steps.Finish && <FinishStep />}
      </div>
      {shouldShowActionBar && <ActionBar />}
    </RootContainer>
  );
};

export default IceCreamKiosk;
