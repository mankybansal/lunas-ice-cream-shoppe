import styled from "@emotion/styled";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
import { getRandomIceCream } from "~/App/utils/random.ts";

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

const RootVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const KioskContent = () => {
  const { watch } = useFormContext<KioskFormData>();
  const { appInit, loading } = useAppInit();

  const [randomRender, setRandomRender] = useState(getRandomIceCream());

  const intervalRef = useRef<number | null>(null);

  const currentStep = watch("currentStep");
  const selectedServing = watch("order.currentItem.serving.id");
  const selectedScoops = watch("order.currentItem.flavors").map((f) => f.id);
  const selectedToppings = watch("order.currentItem.toppings").map((t) => t.id);

  useEffect(() => {
    if (currentStep !== AppConfig.Steps.Start) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    if (currentStep === AppConfig.Steps.Start) {
      intervalRef.current = setInterval(() => {
        setRandomRender(getRandomIceCream());
      }, 5000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentStep]);

  useEffect(() => {
    void appInit();
  }, [appInit]);

  let scoopsToShow = selectedScoops;
  let toppingsToShow = selectedToppings;
  let servingToShow = selectedServing;

  if (currentStep === AppConfig.Steps.Start) {
    scoopsToShow = randomRender.scoops;
    toppingsToShow = randomRender.toppings;
    servingToShow = randomRender.serving;
  }

  if (loading) {
    return <RootContainer />;
  }

  return (
    <RootContainer {...RootVariants}>
      <Header />
      <Modals />
      <ContentContainer>
        <IceCreamRenderer
          scoopsToShow={scoopsToShow}
          toppingsToShow={toppingsToShow}
          serving={servingToShow}
          isRandom={!selectedServing}
        />
        {currentStep === AppConfig.Steps.Start && <StartStep />}
        {currentStep === AppConfig.Steps.Servings && <ServingsStep />}
        {currentStep === AppConfig.Steps.Flavors && <FlavorsStep />}
        {currentStep === AppConfig.Steps.Toppings && <ToppingsStep />}
        {currentStep === AppConfig.Steps.Confirm && <ConfirmStep />}
        {currentStep === AppConfig.Steps.Payment && <PaymentStep />}
        {currentStep === AppConfig.Steps.Finish && <FinishStep />}
      </ContentContainer>
      <ActionBar />
    </RootContainer>
  );
};

const Modals = () => {
  // Todo lazy load modals to improve performance.
  return (
    <>
      <HelpModal />
      <ConfirmationModal />
    </>
  );
};

export default IceCreamKiosk;
