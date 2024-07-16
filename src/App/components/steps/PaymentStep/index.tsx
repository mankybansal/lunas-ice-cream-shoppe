import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useRef, useState } from "react";

import Animations from "~/App/animations";
import { CheckCircle } from "~/App/components/icons/CheckCircle.tsx";
import { SpinnerGap } from "~/App/components/icons/SpinnerGap.tsx";
import { XCircle } from "~/App/components/icons/XCircle.tsx";
import { useSetHeaderPrompt } from "~/App/components/Header/headerState.atom";
import { usePaymentHandler } from "~/App/hooks/usePaymentHandler";
import { CenteredContent } from "~/App/Styled";

const strings = {
  prompt: "Make Payment",
  cardCharged: "Your card will be charged: $",
  idle: "Swipe or tap card to complete payment",
  complete: "Payment complete",
  failed: "Payment failed. Please try again.",
  processing: "Processing payment...",
  buttons: {
    simulateSuccess: "Simulate payment success",
    simulateError: "Simulate payment error"
  }
};

const SimulationBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 128px;
  gap: 16px;
`;

const SimulateButton = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 12px 24px;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
`;

const PaymentInteraction = styled.div`
  width: 300px;
  height: 400px;
  padding: 50px;
  transform: scale(0.8);
  margin: -20px auto 0 auto;
`;

const PaymentDevice = styled.div<{ state: PaymentState }>`
  width: 200px;
  height: 140px;
  border: 1px solid #777;
  border-radius: 10px;
  margin: 100px auto 0 auto;
  position: absolute;
  background: #fff;
  z-index: 4;
  transition: all ease 0.3s;

  ::after {
    background-color: ${({ state }) =>
      state === "success"
        ? "#31f631"
        : state === "failed"
          ? "#f56060"
          : "#eee"};
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    width: 180px;
    height: 90px;
    border-radius: 5px;
    transition: all ease 0.3s;
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
    transition: all ease 0.3s;
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

const IconContainer = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  top: calc(50% - 40px);
  transition: all ease 0.3s;
`;

const IconAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
  100% { transform: scale(1); }
`;

const StyledCheckCircle = styled(CheckCircle)`
  width: 48px;
  height: 48px;
  animation: ${IconAnimation} 0.3s ease-out;
`;

const StyledXCircle = styled(XCircle)`
  width: 48px;
  height: 48px;
  animation: ${IconAnimation} 0.3s ease-out;
`;

const SpinningAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinnerGap = styled(SpinnerGap)`
  height: 48px;
  width: 48px;
  color: #666;
  animation: ${SpinningAnimation} 0.75s linear infinite;
`;

const Prompt = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 400;
  color: #888;
`;

const PaymentAmount = styled.div`
  font-weight: 400;
  color: #fa8758;
  font-size: 40px;
  margin-bottom: 20px;
`;

type PaymentState = "loading" | "success" | "failed" | undefined;

const PaymentStep = () => {
  const { paymentHandler, totalPrice, totalAmount, totalTax } =
    usePaymentHandler();
  const [paymentState, setPaymentState] = useState<PaymentState>();
  const timeoutRef = useRef<number | undefined>();

  useSetHeaderPrompt(strings.prompt);

  const handleSimulate = async (state: PaymentState) => {
    if (paymentState === "loading") return;
    if (timeoutRef?.current) clearTimeout(timeoutRef.current);
    setPaymentState("loading");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPaymentState(state);

    if (state !== "success") {
      timeoutRef.current = setTimeout(() => {
        setPaymentState(undefined);
      }, 2500);
      return;
    }

    setTimeout(paymentHandler, 300);
  };

  return (
    <CenteredContent {...Animations.AnimateInUp}>
      <PaymentAmount>
        {strings.cardCharged}
        {totalAmount.toFixed(2)}
      </PaymentAmount>
      <div>
        (Total: ${totalPrice.toFixed(2)} + Sales Tax: ${totalTax.toFixed(2)})
      </div>

      <PaymentInteraction>
        <PaymentDevice state={paymentState}>
          <IconContainer>
            {paymentState === "success" && <StyledCheckCircle />}
            {paymentState === "failed" && <StyledXCircle />}
            {paymentState === "loading" && <StyledSpinnerGap />}
          </IconContainer>
        </PaymentDevice>
        {paymentState === undefined && <PaymentCard />}
      </PaymentInteraction>

      <Prompt>
        {paymentState === "loading"
          ? strings.processing
          : paymentState === "failed"
            ? strings.failed
            : paymentState === "success"
              ? strings.complete
              : strings.idle}
      </Prompt>
      <SimulationBar style={{ opacity: paymentState !== undefined ? 0.3 : 1 }}>
        <SimulateButton onClick={() => handleSimulate("success")}>
          {strings.buttons.simulateSuccess}
        </SimulateButton>
        <SimulateButton onClick={() => handleSimulate("failed")}>
          {strings.buttons.simulateError}
        </SimulateButton>
      </SimulationBar>
    </CenteredContent>
  );
};

export default PaymentStep;
