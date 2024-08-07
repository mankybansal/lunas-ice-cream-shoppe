import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { motion, Variants } from "framer-motion";
import { MediaQuery } from "~/App/mediaQuery.ts";

const RootContainer = styled(motion.div)`
  width: 100%;
`;

const AppLogoSpin = keyframes`
    0% {
        transform: scale(1);
        opacity: 0;
    }
    50% {
        transform: scale(1.3);
        opacity: 0.5;
    }
    100% {
        transform: scale(1.6);
        opacity: 0;
    }
`;

const AppLogoSpin2 = keyframes`
    0% {
        transform: scale(0.5);
        opacity: 0;
    }
    50% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(1.5);
        opacity: 0;
    }
`;

const AppLogoSpin3 = keyframes`
    0% {
        transform: scale(0.2);
        opacity: 0;
    }
    75% {
        transform: scale(0.3);
        opacity: 1;
    }
    100% {
        transform: scale(0.4);
        opacity: 0;
    }
`;

const CircleContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin: 0 auto;
  animation: ${AppLogoSpin} infinite 2s linear;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    height: 80px;
    width: 80px;
  }
`;

const Prompt = styled.div`
  width: 100%;
  margin: 100px 0;
  font-size: 30px;
  font-weight: 400;
  color: #ffa07a;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    margin: 48px 0;
    font-size: 18px;
  }
`;

const CircleContainer2 = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 50%;
  border: 1px solid #555;
  margin: 25% auto 0 auto;
  animation: ${AppLogoSpin2} infinite 2s linear;
`;

const CircleContainer3 = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 50%;
  border: 1px solid #888;
  margin: 0 auto;
  animation: ${AppLogoSpin3} infinite 2s linear;
`;

const RootVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: { delay: 0.5 }
  }
};

interface Props {
  label: string;
}

export const TouchToBegin = ({ label }: Props) => (
  <RootContainer {...RootVariants}>
    <CircleContainer>
      <CircleContainer2>
        <CircleContainer3 />
      </CircleContainer2>
    </CircleContainer>
    <Prompt>{label}</Prompt>
  </RootContainer>
);
