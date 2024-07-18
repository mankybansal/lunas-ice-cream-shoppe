import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { SpinnerGap } from "~/App/components/icons/SpinnerGap.tsx";
import { MediaQuery } from "~/App/mediaQuery.ts";

export const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  overflow-y: auto;
  padding: 24px;
`;

export const ItemContainer = styled(motion.div)<{ selected?: boolean }>`
  width: 300px;
  height: 260px;
  display: flex;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.05);
  transition: all ease 0.3s;
  cursor: pointer;
  border: 3px solid rgba(0, 0, 0, 0);
  text-align: left;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  ${({ selected }) =>
    selected &&
    css`
      border: 3px solid rgba(93, 64, 55, 1) !important;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
      background: white !important;
    `}

  :hover {
    background: #fff5e1;
    border: 3px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.02);
  }

  ${MediaQuery.BreakpointMaxWidth.MD} {
    width: 100%;
    max-width: 320px;
    height: unset;
  }
`;

export const EmptyItem = styled.div`
  width: 300px;
  height: 260px;
  display: flex;
`;

export const ItemPrimaryInfo = styled.div`
  padding: 32px 32px 0 32px;
  width: 100%;
  flex-direction: column;
  display: flex;
  flex: 1;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    padding: 16px;
  }
`;

export const ItemTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #5d4037;
  margin-bottom: 20px;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    font-size: 16px;
    margin-bottom: 4px;
  }
`;

export const ItemImage = styled.img`
  width: 100px;
  margin-bottom: 10px;
  opacity: 0.7;
`;

export const ItemDescription = styled.div`
  line-height: 24px;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const ItemCategory = styled.div`
  font-weight: 600;
  margin-top: 10px;
  color: #fa8758;
  margin-bottom: 5px;
`;

export const ItemCalories = styled.div`
  color: #9c8b73;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    font-size: 14px;
  }
`;

export const ItemPrice = styled.div`
  font-weight: 600;
  color: #fa8758;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    font-size: 14px;
  }
`;

export const ItemSecondaryInfo = styled.div`
  padding: 0 32px 32px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    padding: 16px;
  }
`;

export const CenteredContent = styled(motion.div)`
  display: flex;
  align-items: center;
  background: white;
  padding-top: 100px;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
  ${MediaQuery.BreakpointMaxWidth.MD} {
    padding-top: 0;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #efefef;
`;

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 0 8px;
`;

export const ModalContainer = styled(motion.div)`
  background: white;
  border-radius: 24px;
  position: relative;
  border: 1px solid #ccc;
  text-align: left;
  display: flex;
  max-width: 600px;
  min-width: 400px;
  max-height: 90%;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    min-width: unset;
    width: 100%;
    border-radius: 16px;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px;
  flex: 1;
  overflow: auto;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    padding: 48px 24px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
`;

const SpinningAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledSpinnerGap = styled(SpinnerGap)`
  height: 48px;
  width: 48px;
  color: #666;
  animation: ${SpinningAnimation} 0.75s linear infinite;
`;
