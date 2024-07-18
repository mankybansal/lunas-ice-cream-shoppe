import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";

import { actionBarStateAtom } from "./actionBarState.atom";

import Animations from "~/App/animations";
import * as AppConfig from "~/App/config.ts";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";
import { useMediaQuery } from "~/App/hooks/useMediaQuery.ts";
import { MediaQuery } from "~/App/mediaQuery.ts";

const RootContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: sticky;
  bottom: 0;
`;

const ActionButton = styled(motion.button)`
  padding: 24px;
  font-size: 20px;
  font-weight: 400;
  outline: none;
  border: 0;
  display: flex;
  gap: 16px;
  justify-items: center;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  color: white;
  text-align: center;
  transition: all ease 0.3s;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    height: unset;
  }
`;

const NextButton = styled(ActionButton)`
  background: #5d4037;
  flex: 2;
  white-space: nowrap;

  :active {
    background: #4e342e;
  }
`;

const PrevButton = styled(ActionButton)`
  background: #f5e6cc;
  color: #5d4037;
  flex: 1;
  max-width: 500px;

  :active {
    // darker
    background: #d4c2a3;
  }
`;

const StepControl = styled.div`
  display: flex;
  bottom: 0;
  height: 120px;
  width: 100%;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    height: unset;
  }
`;

export const ActionBar = () => {
  const isMobile = useMediaQuery(MediaQuery.MaxWidth.MD);
  const { currentStep } = useStepHandler();
  const { back, next, review } = useAtomValue(actionBarStateAtom);
  if (!back && !next) return null;

  if (
    currentStep === AppConfig.Steps.Finish ||
    currentStep === AppConfig.Steps.Payment ||
    currentStep === AppConfig.Steps.Start
  ) {
    return null;
  }

  return (
    <RootContainer {...Animations.AnimateInUp}>
      {review}
      <StepControl>
        {back && (
          <PrevButton onClick={back.onClick} {...Animations.AnimateInRight}>
            {back.icon} {!isMobile && back.label}
          </PrevButton>
        )}
        {next && (
          <NextButton onClick={next.onClick} {...Animations.AnimateInUp}>
            {next.label} {next.icon}
          </NextButton>
        )}
      </StepControl>
    </RootContainer>
  );
};
