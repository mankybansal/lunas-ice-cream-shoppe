import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { useFormContext } from "react-hook-form";

import * as AppConfig from "~/App/config";
import { defaultCurrentItem } from "~/App/config";

import { headerStateAtom } from "./headerState.atom";

import Animations from "~/App/animations";
import { ShoppingCart } from "~/App/components/icons/ShoppingCart";
import { helpModalStateAtom } from "~/App/components/HelpModal/helpModalState.atom";
import { usePaymentHandler } from "~/App/hooks/usePaymentHandler";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import { KioskFormData } from "~/App/types";
import { confirmationModalStateAtom } from "~/App/components/ConfirmationModal/confirmationModalState.atom";
import { MediaQuery } from "~/App/mediaQuery.ts";
import { useMediaQuery } from "~/App/hooks/useMediaQuery.ts";

const strings = {
  appLogo: "Luna's Ice Cream",
  cancelOrder: "Cancel Order",
  help: "Help"
};

const RootContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  //position: sticky;
  top: 0;
  z-index: 1;
  padding: 16px 24px;
  flex-direction: column;
  width: 100%;
  background: white;
  height: min-content;
  align-items: center;
  border-bottom: 2px solid #eee;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.05);

  ${MediaQuery.BreakpointMaxWidth.MD} {
    padding: 16px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1460px;
  height: 72px;
  align-items: center;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    flex-direction: column;
    height: unset;
    gap: 8px;
  }
`;

const Logo = styled.div`
  display: flex;
  font-size: 32px;
  flex: 1;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    font-size: 16px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  justify-content: flex-end;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    gap: 8px;
  }
`;

const Action = styled.button`
  background: white;
  display: flex;
  cursor: pointer;
  padding: 12px 24px;
  font-weight: 500;
  font-size: 16px;
  height: min-content;
  white-space: nowrap;
  border: 1px solid #777;
  border-radius: 32px;
  transition: all ease 0.3s;

  :active {
    background: #f5f5f5;
    border: 1px solid #000;
  }

  ${MediaQuery.BreakpointMaxWidth.MD} {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const Prompt = styled.div`
  display: flex;
  flex: 1;
  font-size: 32px;
  justify-content: center;
  font-weight: 500;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    margin: 8px 0;
    font-size: 22px;
    justify-content: flex-start;
  }
`;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: white;
  border-radius: 50%;
  background: #fa8758;
  margin-right: -8px;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    width: 16px;
    height: 16px;
    font-size: 10px;
  }
`;

const MobileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  justify-content: space-between;
`;

const Header = () => {
  const isMobile = useMediaQuery(MediaQuery.MaxWidth.MD);
  const { watch, setValue } = useFormContext<KioskFormData>();

  const setHelpModalState = useSetAtom(helpModalStateAtom);
  const setConfirmationModalState = useSetAtom(confirmationModalStateAtom);

  const order = watch("order");
  const itemCount = order.items.length;

  const { totalPrice } = usePaymentHandler();
  const { prompt } = useAtomValue(headerStateAtom);
  const { stepHandler, currentStep } = useStepHandler();

  const handleClickCancel = () => {
    setConfirmationModalState({
      isVisible: true,
      onCancel: () => {},
      onConfirm: () => stepHandler(AppConfig.Steps.Start),
      title: "Cancel order",
      content: "Are you sure you want to cancel your order?",
      cancelText: "Don't cancel",
      confirmText: "Yes, cancel"
    });
  };

  const handleClickHelp = () => setHelpModalState({ isVisible: true });

  if (currentStep === AppConfig.Steps.Start) return null;

  const cart = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        padding: isMobile ? 0 : "0px 16px"
      }}
      onClick={() => {
        // Reset the current item.
        setValue("order.currentItem", defaultCurrentItem());
        void stepHandler(AppConfig.Steps.Confirm);
      }}
    >
      <Circle>{itemCount}</Circle>
      <ShoppingCart height={"24px"} width={"24px"} />
      {!isMobile && (
        <span style={{ fontWeight: "bold" }}>${totalPrice.toFixed(2)}</span>
      )}
    </div>
  );

  const shouldShowCart =
    (currentStep === AppConfig.Steps.Servings ||
      currentStep === AppConfig.Steps.Flavors ||
      currentStep === AppConfig.Steps.Toppings) &&
    itemCount > 0;

  const actions = (
    <ActionsContainer>
      {!isMobile && shouldShowCart && cart}
      {currentStep !== AppConfig.Steps.Finish && (
        <Action onClick={handleClickCancel}>{strings.cancelOrder}</Action>
      )}
      <Action onClick={handleClickHelp}>{strings.help}</Action>
    </ActionsContainer>
  );

  if (isMobile) {
    return (
      <RootContainer {...Animations.AnimateInUp}>
        <InnerContainer>
          <MobileRow>
            <Logo>{strings.appLogo}</Logo>
            {actions}
          </MobileRow>
          <MobileRow>
            <Prompt>{prompt}</Prompt>
            {isMobile && shouldShowCart && cart}
          </MobileRow>
        </InnerContainer>
      </RootContainer>
    );
  }

  return (
    <RootContainer {...Animations.AnimateInUp}>
      <InnerContainer>
        <Logo>{strings.appLogo}</Logo>
        <Prompt>{prompt}</Prompt>
        {shouldShowCart && cart}
        {actions}
      </InnerContainer>
    </RootContainer>
  );
};

export default Header;
