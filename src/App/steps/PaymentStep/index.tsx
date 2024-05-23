import { useCallback, useEffect } from "react";
import Header from "../../Header";
import * as AppConfig from "../../config";

const strings = {
  makePayment: "Make Payment",
  cardCharged: "Your Card Will Be Charged: $",
  swipeCardPrompt: "Swipe Card To Complete Payment",
  paymentAlert: "Click on animation to simulate payment"
};

interface PaymentStepProps {
  totalPrice: number;
  stepHandler: (step: number) => void;
  paymentHandler: () => void;
}

const PaymentStep = ({
  totalPrice,
  stepHandler,
  paymentHandler
}: PaymentStepProps) => {
  const handleStep = useCallback(
    (gotoStep?: number) => () => {
      if (gotoStep && gotoStep < AppConfig.steps.Payment) stepHandler(gotoStep);
      else paymentHandler();
    },
    [stepHandler, paymentHandler]
  );

  useEffect(() => {
    alert(strings.paymentAlert);
  }, []);

  return (
    <div className="App-header-padding">
      <Header prompt={strings.makePayment} stepHandler={(s) => handleStep(s)} />

      <div className="Payment-amount">
        {strings.cardCharged}
        {totalPrice.toFixed(2)}
      </div>

      <div className="paymentInteraction" onClick={handleStep()}>
        <div className="paymentDevice" />
        <div className="paymentCard" />
      </div>

      <div className="cardSwipePrompt">{strings.swipeCardPrompt}</div>
    </div>
  );
};

export default PaymentStep;
