import * as AppConfig from "../config";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import { useAtomValue } from "jotai";
import { headerStateAtom } from "./prompt.atom";
import styled from "@emotion/styled";

const strings = {
  appLogo: "Luna's Ice Cream",
  cancelOrder: "Cancel Order",
  help: "Help"
};

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 24px;
  flex-direction: column;
  width: 100%;
  background: white;
  height: min-content;
  align-items: center;
  border-bottom: 2px solid #eee;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.05);
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 72px;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: unset;
    gap: 8px;
  }
`;

const Logo = styled.div`
  display: flex;
  font-size: 32px;
  flex: 1;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  justify-content: flex-end;
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
  border-radius: 8px;
`;

const Prompt = styled.div`
  display: flex;
  flex: 1;
  font-size: 32px;
  justify-content: center;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const Header = () => {
  const { prompt } = useAtomValue(headerStateAtom);
  const { stepHandler, currentStep } = useStepHandler();
  const handleClickCancel = () => stepHandler(AppConfig.Steps.Start);
  return (
    <RootContainer>
      <InnerContainer>
        <Logo>{strings.appLogo}</Logo>
        <Prompt>{prompt}</Prompt>
        <ActionsContainer>
          {currentStep !== AppConfig.Steps.Finish && (
            <Action onClick={handleClickCancel}>{strings.cancelOrder}</Action>
          )}
          <Action>{strings.help}</Action>
        </ActionsContainer>
      </InnerContainer>
    </RootContainer>
  );
};

export default Header;
