import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const RootContainer = styled.div`
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
`;

const Prompt = styled.div`
  width: 100%;
  margin: 100px 0;
  font-size: 30px;
  font-weight: 400;
  color: #ffa07a;
`;

const CircleContainer2 = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 1px solid #555;
  margin: 25% auto 0 auto;
  animation: ${AppLogoSpin2} infinite 2s linear;
`;

const CircleContainer3 = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 1px solid #888;
  margin: 0 auto;
  animation: ${AppLogoSpin3} infinite 2s linear;
`;

interface Props {
  label: string;
}

export const TouchToBegin = ({ label }: Props) => (
  <RootContainer>
    <CircleContainer>
      <CircleContainer2>
        <CircleContainer3 />
      </CircleContainer2>
    </CircleContainer>
    <Prompt>{label}</Prompt>
  </RootContainer>
);
