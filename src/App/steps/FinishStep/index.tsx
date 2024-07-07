import * as AppConfig from "~/App/config";
import { useEffect, useRef, useState } from "react";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import { KioskFormData } from "~/App/types";
import { useFormContext } from "react-hook-form";
import { useSetHeaderPrompt } from "~/App/Header/headerState.atom";
import { CenteredContent, Divider } from "~/App/Styled";
import Animations from "~/App/animations.ts";
import { CategoryBreakDown } from "~/App/steps/ConfirmStep/CategoryBreakdown";
import styled from "@emotion/styled";
import * as Helpers from "~/App/utils/app";
import { DateTime } from "luxon";
import { Smiley } from "~/App/icons/Smiley.tsx";

const strings = {
  prompt: "Thank You For Your Order",
  orderNumber: "Order #",
  refreshIn: "This page will refresh in"
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

const FinishStep = () => {
  const { stepHandler } = useStepHandler();

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

  useSetHeaderPrompt(strings.prompt);

  const orderPrice = Helpers.calculateOrderPrice(order);

  return (
    <CenteredContent {...Animations.AnimateInUp}>
      <div style={{ display: "flex", gap: "128px", alignItems: "center" }}>
        <Receipt>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#fa8758"
            }}
          >
            Receipt
          </span>
          <span style={{ fontWeight: "bold" }}>Luna's Ice Cream Shoppe</span>
          <span style={{ color: "#aaa", marginTop: "-20px" }}>
            456 Evergreen Terrace Seattle, WA 98101
          </span>
          <span style={{ fontWeight: "bold" }}>
            {strings.orderNumber}
            {order.number}
          </span>
          <span>
            {DateTime.fromJSDate(order.time).toLocaleString(
              DateTime.DATETIME_MED_WITH_WEEKDAY
            )}
          </span>
          <span style={{ marginTop: "-20px" }}>
            Payment method: {order.payment.network} {order.payment.type}{" "}
            {order.payment.number.slice(-4)}
          </span>
          <span style={{ marginTop: "-20px" }}>
            Amount paid: ${order.payment.amount.toFixed(2)}
          </span>
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
            <span style={{ fontWeight: 400, color: "#aaa" }}>Subtotal</span>
            <span
              style={{
                fontWeight: 400,
                color: "#aaa",
                minWidth: "48px",
                textAlign: "right"
              }}
            >
              ${orderPrice.toFixed(2)}
            </span>
          </TotalContainer>
          <TotalContainer style={{ marginTop: "-24px" }}>
            <span style={{ fontWeight: 400, color: "#aaa" }}>
              Sales Tax (10.1%)
            </span>
            <span
              style={{
                fontWeight: 400,
                color: "#aaa",
                minWidth: "48px",
                textAlign: "right"
              }}
            >
              ${(orderPrice * 0.101).toFixed(2)}
            </span>
          </TotalContainer>
          <TotalContainer style={{ marginTop: "-8px" }}>
            <span style={{ fontWeight: 600, color: "black" }}>Total</span>
            <span
              style={{
                fontWeight: 600,
                color: "black",
                minWidth: "48px",
                textAlign: "right"
              }}
            >
              ${(orderPrice * 1.101).toFixed(2)}
            </span>
          </TotalContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              marginTop: "16px",
              justifyContent: "center"
            }}
          >
            <span style={{ fontWeight: "bold" }}>Thank you!</span>
            <Smiley width={"24px"} height={"24px"} />
          </div>
        </Receipt>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="Payment-amount Order-number">
            {strings.orderNumber}
            {order.number}
          </div>
          <span
            style={{
              fontSize: "32px",
              marginBottom: "16px"
            }}
          >
            Collect your receipt
          </span>

          <br />
          <br />

          <div className="cardSwipePrompt">
            {strings.refreshIn} {timer} seconds
          </div>
        </div>
      </div>
    </CenteredContent>
  );
};

export default FinishStep;
