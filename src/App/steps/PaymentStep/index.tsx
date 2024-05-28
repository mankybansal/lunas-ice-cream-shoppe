import { useCallback } from "react";
import * as AppConfig from "../../config";
import { usePaymentHandler } from "~/App/hooks/usePaymentHandler";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import { useSetHeaderPrompt } from "~/App/Header/headerState.atom";
import { CenteredContent } from "~/App/Styled";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const strings = {
  prompt: "Make Payment",
  cardCharged: "Your Card Will Be Charged: $",
  swipeCardPrompt: "Swipe Card To Complete Payment",
  simulate: "Simulate payment"
};

const SimulateButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  padding: 12px 24px;
  background: #eee;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 64px;
`;

const PaymentInteraction = styled.div`
  width: 300px;
  height: 400px;
  padding: 50px;
  transform: scale(0.8);
  margin: -20px auto 0 auto;
`;

const PaymentDevice = styled.div`
  width: 200px;
  height: 140px;
  border: 1px solid #777;
  border-radius: 10px;
  margin: 100px auto 0 auto;
  position: absolute;
  background: #fff;
  z-index: 4;

  ::after {
    background-color: #eee;
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    width: 180px;
    height: 90px;
    border-radius: 5px;
  }

  ::before {
    background-color: #ddd;
    content: "";
    position: absolute;
    top: 110px;
    right: 10px;
    z-index: 5;
    width: 60px;
    height: 20px;
    border-radius: 5px;
  }
`;

const CardSwipeAnimation = keyframes`
  0% {
    transform: translateY(0px) scaleY(1) scaleX(1) translateZ(0px);
    opacity: 0;
  }
  10% {
    transform: translateY(0px) scaleY(1.1) scaleX(1.1) translateZ(0px);
    opacity: 1;
  }
  20% {
    transform: translateY(0px) scaleY(1) scaleX(1) translateZ(0px);
  }
  100% {
    transform: translateY(0px) scaleY(1) scaleX(1) translateZ(0px);
    opacity: 0;
    margin-top: 260px;
  }
`;

const PaymentCard = styled.div`
  margin-left: 180px;
  width: 45px;
  height: 70px;
  border: 1px solid #777;
  border-radius: 5px;
  animation: ${CardSwipeAnimation} 3s -1s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    infinite;

  ::after {
    background-color: #777;
    content: "";
    position: absolute;
    margin-left: -18px;
    width: 10px;
    height: 70px;
    opacity: 1;
  }
`;

const Prompt = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 400;
  color: #888;
`;

const PaymentStep = () => {
  const { paymentHandler, totalPrice } = usePaymentHandler();
  const { stepHandler } = useStepHandler();

  const handleStep = useCallback(
    (gotoStep?: number) => () => {
      if (gotoStep && gotoStep < AppConfig.Steps.Payment)
        return stepHandler(gotoStep);

      return paymentHandler();
    },
    [stepHandler, paymentHandler]
  );

  useSetHeaderPrompt(strings.prompt);

  return (
    <CenteredContent>
      <div className="Payment-amount">
        {strings.cardCharged}
        {totalPrice.toFixed(2)}
      </div>

      <PaymentInteraction>
        <PaymentDevice />
        <PaymentCard />
      </PaymentInteraction>

      <Prompt>{strings.swipeCardPrompt}</Prompt>
      <SimulateButton onClick={handleStep()}>{strings.simulate}</SimulateButton>
    </CenteredContent>
  );
};

export default PaymentStep;
