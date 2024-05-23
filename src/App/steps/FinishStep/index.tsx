import { useState, useEffect, useRef } from "react";
import * as AppConfig from "../../config";
import { CompletedOrder } from "~/api.ts";
import styled from "@emotion/styled";

const strings = {
  thankYou: "Thank You For Your Order",
  orderNumber: "Order #",
  placedAt: "Placed at",
  paidBy: "paid by",
  endingWith: "ending with",
  refreshIn: "This page will refresh in"
};

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface FinishStepProps {
  currentStep: number;
  order: CompletedOrder;
  stepHandler: (step: number) => void;
}

const FinishStep = ({ currentStep, order, stepHandler }: FinishStepProps) => {
  const [timer, setTimer] = useState<number>(20);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          stepHandler(AppConfig.steps.Start);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 20;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentStep, stepHandler]);

  if (currentStep !== AppConfig.steps.Finish) return null;

  return (
    <RootContainer>
      <div className="App-prompt" style={{ marginTop: "32px" }}>
        {strings.thankYou}
      </div>

      <div className="Payment-amount Order-number">
        {strings.orderNumber}
        {order.number}
      </div>

      <div className="Payment-amount-small">
        {strings.placedAt} {order.time.toLocaleTimeString()} on{" "}
        {order.time.toLocaleDateString()}
      </div>

      <div className="Payment-amount-small">
        ${order.payment.amount.toFixed(2)} {strings.paidBy}{" "}
        {order.payment.network} {order.payment.type} {strings.endingWith}{" "}
        {order.payment.number.slice(-4)}
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="cardSwipePrompt">
        {strings.refreshIn} {timer} seconds
      </div>
    </RootContainer>
  );
};

export default FinishStep;
