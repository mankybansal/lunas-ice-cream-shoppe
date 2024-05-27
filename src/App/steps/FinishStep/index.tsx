import { useEffect, useRef, useState } from "react";
import * as AppConfig from "../../config";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";
import { KioskFormData } from "~/App/types.ts";
import { useFormContext } from "react-hook-form";
import { useSetHeaderPrompt } from "~/App/Header/prompt.atom.ts";
import { CenteredContent } from "~/App/Styled.ts";

const strings = {
  prompt: "Thank You For Your Order",
  orderNumber: "Order #",
  placedAt: "Placed at",
  paidBy: "paid by",
  endingWith: "ending with",
  refreshIn: "This page will refresh in"
};

const FinishStep = () => {
  const { stepHandler, currentStep } = useStepHandler();

  const { getValues } = useFormContext<KioskFormData>();
  const order = getValues("completedOrder")!;

  const [timer, setTimer] = useState<number>(20);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          void stepHandler(AppConfig.Steps.Start);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 20;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stepHandler]);

  if (currentStep !== AppConfig.Steps.Finish) return null;

  useSetHeaderPrompt(strings.prompt);

  return (
    <CenteredContent>
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
    </CenteredContent>
  );
};

export default FinishStep;
