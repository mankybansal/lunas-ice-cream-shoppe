import { useAtomValue } from "jotai";
import { actionBarStateAtom } from "./actionBarState.atom";
import { motion } from "framer-motion";
import Animations from "~/App/animations";
import styled from "@emotion/styled";

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
`;

const NextButton = styled(ActionButton)`
  background: #5d4037;
  flex: 2;

  @media screen (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const PrevButton = styled(ActionButton)`
  background: #f5e6cc;
  color: #5d4037;
  flex: 1;
  max-width: 500px;

  @media screen (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const StepControl = styled.div`
  display: flex;
  bottom: 0;
  height: 120px;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: unset;
  }
`;

export const ActionBar = () => {
  const { back, next, review } = useAtomValue(actionBarStateAtom);
  if (!back && !next) return null;
  return (
    <RootContainer {...Animations.AnimateInUp}>
      {review}
      <StepControl>
        {back && (
          <PrevButton onClick={back.onClick} {...Animations.AnimateInRight}>
            {back.icon} {back.label}
          </PrevButton>
        )}
        {next && (
          <NextButton onClick={next.onClick} {...Animations.AnimateInRight}>
            {next.label} {next.icon}
          </NextButton>
        )}
      </StepControl>
    </RootContainer>
  );
};
