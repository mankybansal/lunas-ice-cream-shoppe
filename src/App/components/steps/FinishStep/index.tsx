import styled from "@emotion/styled";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import Animations from "~/App/animations";
import { useSetHeaderPrompt } from "~/App/components/Header/headerState.atom";
import { ArrowClockwise } from "~/App/components/icons/ArrowClockwise";
import { Smiley } from "~/App/components/icons/Smiley";
import { CategoryBreakDown } from "~/App/components/steps/ConfirmStep/CategoryBreakdown";
import * as AppConfig from "~/App/config";
import { SalesTaxRate } from "~/App/config";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import { CenteredContent, Divider } from "~/App/Styled";
import { KioskFormData } from "~/App/types";
import * as Helpers from "~/App/utils/app";
import { MediaQuery } from "~/App/mediaQuery.ts";
import { useMediaQuery } from "~/App/hooks/useMediaQuery.ts";

const strings = {
  prompt: "Thank You For Your Order",
  orderNumber: "Order #",
  refreshIn: "This page will refresh in",
  startOver: "Start over",
  receiptTitle: "Receipt",
  shopName: "Luna's Ice Cream Shoppe",
  shopAddress: "456 Evergreen Terrace Seattle, WA 98101",
  paymentMethod: "Payment method: ",
  amountPaid: "Amount paid: $",
  subtotal: "Subtotal",
  salesTax: "Sales Tax",
  total: "Total",
  thankYou: "Thank you!",
  collectReceipt: "Collect your receipt"
};

const Receipt = styled.div`
  display: flex;
  width: 420px;
  gap: 24px;
  flex-direction: column;
  background: white;
  align-items: flex-start;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.05);
  margin: 16px 0;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    width: 100%;
  }
`;

const ReceiptItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const ReceiptItemTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const GrayText = styled.span`
  color: #aaa;
`;

const HighlightedText = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #fa8758;
`;

const LargeText = styled.span`
  font-size: 32px;
  margin-bottom: 16px;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    font-size: 20px;
  }
`;

const TimerText = styled.div`
  margin: 32px 0;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    margin: 16px 0;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 128px;
  align-items: center;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    flex-direction: column;
    gap: 24px;
  }
`;

const ThankYouContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
`;

const OrderNumber = styled.div`
  font-weight: 400;
  font-size: 80px;
  color: black;
  margin-bottom: 70px;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    font-size: 32px;
    margin-bottom: 12px;
    margin-top: 32px;
  }
`;

const ReceiptGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StartOverText = styled.button`
  font-weight: 500;
  font-size: 20px;
  justify-content: center;
  color: #fa8758;
  cursor: pointer;
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  padding: 24px;
  transition: all ease 0.3s;
  border-radius: 8px;

  :active {
    background: #f5f5f5;
  }

  ${MediaQuery.BreakpointMaxWidth.MD} {
    margin-top: 0px;
  }
`;

const StyledArrowClockwise = styled(ArrowClockwise)<{ spin?: boolean }>`
  width: 24px;
  height: 24px;
  color: #fa8758;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  ${({ spin }) => spin && `animation: spin 0.3s ease;`}
`;

const FinishStep = () => {
  const isMobile = useMediaQuery(MediaQuery.MaxWidth.MD);
  const { stepHandler } = useStepHandler();
  const { getValues } = useFormContext<KioskFormData>();
  const order = getValues("completedOrder")!;
  const [timer, setTimer] = useState<number>(20);
  const intervalRef = useRef<number | null>(null);

  const [isSpinning, setIsSpinning] = useState(false);

  const handleClickStartover = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      void stepHandler(AppConfig.Steps.Start);
    }, 300); // Duration of the spin animation
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
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

  useSetHeaderPrompt(strings.prompt);

  const orderPrice = Helpers.calculateOrderPrice(order);

  const orderNumber = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <OrderNumber>
        {strings.orderNumber}
        {order.number}
      </OrderNumber>
      <LargeText>{strings.collectReceipt}</LargeText>
      <TimerText>
        {strings.refreshIn} {timer} seconds
      </TimerText>
      <StartOverText onClick={handleClickStartover}>
        <StyledArrowClockwise spin={isSpinning} />
        {strings.startOver}
      </StartOverText>
    </div>
  );

  return (
    <CenteredContent {...Animations.AnimateInUp}>
      <FlexContainer>
        {isMobile && orderNumber}
        <Receipt>
          <HighlightedText>{strings.receiptTitle}</HighlightedText>
          <ReceiptGroup style={{ gap: 4 }}>
            <BoldText>{strings.shopName}</BoldText>
            <GrayText>{strings.shopAddress}</GrayText>
          </ReceiptGroup>
          <BoldText>
            {strings.orderNumber}
            {order.number}
          </BoldText>
          <ReceiptGroup style={{ gap: 4 }}>
            <span>
              {DateTime.fromJSDate(order.time).toLocaleString(
                DateTime.DATETIME_MED_WITH_WEEKDAY
              )}
            </span>
            <span>
              {strings.paymentMethod}
              {order.payment.network} {order.payment.type}{" "}
              {order.payment.number.slice(-4)}
            </span>
            <span>
              {strings.amountPaid}
              {order.payment.amount.toFixed(2)}
            </span>
          </ReceiptGroup>
          <Divider />
          {order.items.map((item, i) => (
            <ReceiptItem key={i}>
              <ReceiptItemTitle>1x {item.serving!.name}</ReceiptItemTitle>
              <CategoryBreakDown items={item.flavors} />
              <CategoryBreakDown items={item.toppings} />
            </ReceiptItem>
          ))}
          <Divider />
          <TotalContainer>
            <GrayText>{strings.subtotal}</GrayText>
            <GrayText>${orderPrice.toFixed(2)}</GrayText>
          </TotalContainer>
          <TotalContainer style={{ marginTop: "-24px" }}>
            <GrayText>
              {strings.salesTax} ({(SalesTaxRate * 100).toFixed(2)}%)
            </GrayText>
            <GrayText>${(orderPrice * 0.101).toFixed(2)}</GrayText>
          </TotalContainer>
          <TotalContainer style={{ marginTop: "-8px" }}>
            <BoldText>{strings.total}</BoldText>
            <BoldText>${(orderPrice * 1.101).toFixed(2)}</BoldText>
          </TotalContainer>
          <ThankYouContainer>
            <BoldText>{strings.thankYou}</BoldText>
            <Smiley width={"24px"} height={"24px"} />
          </ThankYouContainer>
        </Receipt>
        {!isMobile && orderNumber}
      </FlexContainer>
    </CenteredContent>
  );
};

export default FinishStep;
