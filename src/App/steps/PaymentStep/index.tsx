import { useCallback, useEffect } from "react";
import * as AppConfig from "../../config";
import { usePaymentHandler } from "~/App/hooks/usePaymentHandler.ts";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";
import { useSetHeaderPrompt } from "~/App/Header/headerState.atom";
import { CenteredContent } from "~/App/Styled.ts";

const strings = {
  prompt: "Make Payment",
  cardCharged: "Your Card Will Be Charged: $",
  swipeCardPrompt: "Swipe Card To Complete Payment",
  paymentAlert: "Click on animation to simulate payment"
};

const PaymentStep = () => {
  const { paymentHandler, totalPrice } = usePaymentHandler();
  const { stepHandler } = useStepHandler();

  const handleStep = useCallback(
    (gotoStep?: number) => () => {
      if (gotoStep && gotoStep < AppConfig.Steps.Payment) {
        return stepHandler(gotoStep);
      }

      return paymentHandler();
    },
    [stepHandler, paymentHandler]
  );

  useEffect(() => {
    alert(strings.paymentAlert);
  }, []);

  useSetHeaderPrompt(strings.prompt);

  return (
    <CenteredContent>
      <div className="Payment-amount">
        {strings.cardCharged}
        {totalPrice.toFixed(2)}
      </div>

      <div className="paymentInteraction" onClick={handleStep()}>
        <div className="paymentDevice" />
        <div className="paymentCard" />
      </div>

      <div className="cardSwipePrompt">{strings.swipeCardPrompt}</div>
    </CenteredContent>
  );
};

export default PaymentStep;
