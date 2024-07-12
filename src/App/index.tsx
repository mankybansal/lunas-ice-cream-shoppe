import { ActionBar } from "~/App/ActionBar";

import {
  ConfirmStep,
  FinishStep,
  FlavorsStep,
  PaymentStep,
  ServingsStep,
  StartStep,
  ToppingsStep
} from "./steps";
import { useEffect, useMemo, useRef, useState } from "react";
import * as AppConfig from "./config";

import { KioskFormData } from "./types";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useAppInit } from "~/App/hooks/useAppInit";
import { IceCreamRenderer } from "~/App/IceCreamRenderer";
import styled from "@emotion/styled";
import Header from "~/App/Header";

const RootContainer = styled.div`
  text-align: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  display: flex;
  background: #fff5e1;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
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

const getRandomToppings = (): string[] => {
  // Currently only one topping is supported.
  const randomIndex = Math.floor(Math.random() * 8) + 1;
  return ["TOP" + randomIndex.toString()];
};

const getRandomServing = (): string => {
  const randomIndex = Math.floor(Math.random() * 2) + 1;
  return "SER" + randomIndex.toString();
};

const getRandomRender = () => {
  const serving = getRandomServing();
  return {
    scoops: getRandomFlavors(serving === "SER1" ? 3 : 2),
    serving
  };
};

const KioskContent = () => {
  const { watch } = useFormContext<KioskFormData>();
  const { appInit } = useAppInit();

  const [randomRender, setRandomRender] = useState<{
    scoops: string[];
    serving: string;
  }>(getRandomRender());

  const intervalRef = useRef<number | null>(null);

  const serving = watch("order.currentItem.serving");
  const currentStep = watch("currentStep");
  const selectedScoops = watch("order.currentItem.flavors").map((f) => f.id);
  const selectedToppings = watch("order.currentItem.toppings").map((t) => t.id);

  useEffect(() => {
    if (currentStep !== AppConfig.Steps.Start) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    if (currentStep === AppConfig.Steps.Start) {
      intervalRef.current = setInterval(() => {
        setRandomRender(getRandomRender());
      }, 5000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentStep]);

  useEffect(() => {
    void appInit();
  }, [appInit]);

  const selectedServing = useMemo(
    () => (serving ? serving.id : randomRender.serving),
    [serving, randomRender.serving]
  );

  const randomFlavors = useMemo(() => randomRender.scoops, [randomRender]);

  const randomToppings = useMemo(() => getRandomToppings(), []);

  const scoopsToShow = useMemo(
    () =>
      currentStep === AppConfig.Steps.Start ? randomFlavors : selectedScoops,
    [currentStep, selectedScoops, randomFlavors]
  );

  const toppingsToShow = useMemo(
    () =>
      currentStep === AppConfig.Steps.Start ? randomToppings : selectedToppings,
    [currentStep, randomToppings, selectedToppings]
  );

  const shouldShowRenderer = useMemo(
    () =>
      currentStep < AppConfig.Steps.Confirm &&
      (currentStep === AppConfig.Steps.Servings ? !!serving : true),
    [currentStep, serving]
  );
  const shouldShowHeader = currentStep !== AppConfig.Steps.Start;
  const shouldShowActionBar =
    currentStep !== AppConfig.Steps.Finish &&
    currentStep !== AppConfig.Steps.Payment &&
    currentStep !== AppConfig.Steps.Start;

  return (
    <RootContainer>
      {shouldShowHeader && <Header />}
      <ContentContainer>
        {shouldShowRenderer && (
          <IceCreamRenderer
            scoopsToShow={scoopsToShow}
            toppingsToShow={toppingsToShow}
            serving={selectedServing}
            wide={currentStep === AppConfig.Steps.Start}
          />
        )}
        {currentStep === AppConfig.Steps.Start && <StartStep />}
        {currentStep === AppConfig.Steps.Servings && <ServingsStep />}
        {currentStep === AppConfig.Steps.Flavors && <FlavorsStep />}
        {currentStep === AppConfig.Steps.Toppings && <ToppingsStep />}
        {currentStep === AppConfig.Steps.Confirm && <ConfirmStep />}
        {currentStep === AppConfig.Steps.Payment && <PaymentStep />}
        {currentStep === AppConfig.Steps.Finish && <FinishStep />}
      </ContentContainer>
      {shouldShowActionBar && <ActionBar />}
    </RootContainer>
  );
};

export default IceCreamKiosk;
