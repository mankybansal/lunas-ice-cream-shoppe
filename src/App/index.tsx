import { useState, useEffect, useCallback } from "react";
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
import REQUESTS, { ApiResponse, CompletedOrder, PaymentDetails } from "~/api";
import * as Helpers from "./utils";
import { Menu, Order } from "./types";

const IceCreamKiosk = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [menu, setMenu] = useState<Menu>({
    servings: [],
    flavors: [],
    toppings: []
  });
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(
    null
  );
  const [order, setOrder] = useState<Order>(AppConfig.defaultState().order);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const appInit = useCallback(() => {
    Helpers.appInitPrinter();
    return REQUESTS.GetMenu(({ success, data }) => {
      if (!success) return;
      setMenu(data);
      setCurrentStep(AppConfig.steps.Start);
      Helpers.menuPrinter(data);
    });
  }, []);

  useEffect(() => {
    void appInit();
  }, [appInit]);

  const stepHandler = (gotoStep: number) => {
    if (gotoStep === AppConfig.steps.Start) {
      setCurrentStep(AppConfig.steps.Start);
      setOrder(AppConfig.defaultState().order);
      setTotalPrice(0);
      setCompletedOrder(null);
      void appInit();
    } else {
      setCurrentStep(gotoStep);
    }
  };

  const orderHandler = (newOrder: Order) => {
    setOrder(newOrder);
  };

  const priceHandler = () => {
    setTotalPrice(Helpers.calculatePrice(order));
  };

  const paymentHandler = async () => {
    console.log("\nProcessing Payment...\n");
    return REQUESTS.SendPayment(
      totalPrice,
      AppConfig.CardDetails,
      (response: ApiResponse<PaymentDetails>) => {
        const { success, data: sendPaymentResponse } = response;

        if (!success || !sendPaymentResponse) return;

        Helpers.paymentPrinter(sendPaymentResponse);
        return REQUESTS.SendOrder(order, sendPaymentResponse, (response) => {
          const { success, data: sendOrderResponse } = response;
          if (!success) return;

          setCompletedOrder(sendOrderResponse);
          setCurrentStep(AppConfig.steps.Finish);
          Helpers.orderPrinter(sendOrderResponse);
        });
      }
    );
  };

  return (
    <div className="App">
      {currentStep === AppConfig.steps.Start && (
        <StartStep stepHandler={stepHandler} />
      )}
      {currentStep === AppConfig.steps.Servings && (
        <ServingsStep
          stepHandler={stepHandler}
          orderHandler={orderHandler}
          servings={menu.servings}
          order={order}
        />
      )}
      {currentStep === AppConfig.steps.Flavors && (
        <FlavorsStep
          stepHandler={stepHandler}
          orderHandler={orderHandler}
          flavors={menu.flavors}
          order={order}
        />
      )}
      {currentStep === AppConfig.steps.Toppings && (
        <ToppingsStep
          stepHandler={stepHandler}
          orderHandler={orderHandler}
          priceHandler={priceHandler}
          toppings={menu.toppings}
          order={order}
        />
      )}
      {currentStep === AppConfig.steps.Confirm && (
        <ConfirmStep
          stepHandler={stepHandler}
          orderHandler={orderHandler}
          priceHandler={priceHandler}
          order={order}
          totalPrice={totalPrice}
        />
      )}
      {currentStep === AppConfig.steps.Payment && (
        <PaymentStep
          stepHandler={stepHandler}
          paymentHandler={paymentHandler}
          totalPrice={totalPrice}
        />
      )}
      {completedOrder && (
        <FinishStep
          stepHandler={stepHandler}
          currentStep={currentStep}
          order={completedOrder}
        />
      )}
    </div>
  );
};

export default IceCreamKiosk;
