import styled from "@emotion/styled";
import { motion, Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import {
  ConfirmStep,
  FinishStep,
  FlavorsStep,
  PaymentStep,
  ServingsStep,
  StartStep,
  ToppingsStep
} from "./components/steps";
import * as AppConfig from "./config";
import { KioskFormData } from "./types";

import { ActionBar } from "~/App/components/ActionBar";
import Header from "~/App/components/Header";
import { HelpModal } from "~/App/components/HelpModal";
import { IceCreamRenderer } from "~/App/components/IceCreamRenderer";
import { useAppInit } from "~/App/hooks/useAppInit";
import { ConfirmationModal } from "~/App/components/ConfirmationModal";

const RootContainer = styled(motion.div)`
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
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
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

const getRandomToppings = (scoops: number): string[] => {
  const selectedToppings = new Set<string>();
  while (selectedToppings.size < scoops) {
    const randomIndex = Math.floor(Math.random() * 8) + 1;
    selectedToppings.add("TOP" + randomIndex.toString());
  }
  return Array.from(selectedToppings);
};

const getRandomServing = (): string => {
  const randomIndex = Math.floor(Math.random() * 2) + 1;
  return "SER" + randomIndex.toString();
};

const getRandomRender = () => {
  const serving = getRandomServing();
  return {
    scoops: getRandomFlavors(serving === "SER1" ? 3 : 2),
    serving,
    toppings: getRandomToppings(serving === "SER1" ? 2 : 1)
  };
};

const RootVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const KioskContent = () => {
  const { watch } = useFormContext<KioskFormData>();
  const { appInit } = useAppInit();

  const [randomRender, setRandomRender] = useState<{
    scoops: string[];
    serving: string;
    toppings: string[];
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

  const scoopsToShow = useMemo(
    () =>
      currentStep === AppConfig.Steps.Start
        ? randomRender.scoops
        : selectedScoops,
    [currentStep, selectedScoops, randomRender.scoops]
  );

  const toppingsToShow = useMemo(
    () =>
      currentStep === AppConfig.Steps.Start
        ? randomRender.toppings
        : selectedToppings,
    [currentStep, randomRender.toppings, selectedToppings]
  );

  const shouldShowHeader = currentStep !== AppConfig.Steps.Start;
  const shouldShowActionBar =
    currentStep !== AppConfig.Steps.Finish &&
    currentStep !== AppConfig.Steps.Payment &&
    currentStep !== AppConfig.Steps.Start;

  return (
    <RootContainer {...RootVariants}>
      {shouldShowHeader && <Header />}
      <HelpModal />
      <ConfirmationModal />
      <ContentContainer>
        <IceCreamRenderer
          scoopsToShow={scoopsToShow}
          toppingsToShow={toppingsToShow}
          serving={selectedServing}
        />
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
