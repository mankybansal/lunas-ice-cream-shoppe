import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { motion } from "framer-motion";

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
`;

export const ItemTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #5d4037;
  margin-bottom: 20px;
`;

export const ItemImage = styled.img`
  width: 100px;
  margin-bottom: 10px;
  opacity: 0.7;
`;

export const ItemDescription = styled.div`
  line-height: 24px;
`;

export const ItemCategory = styled.div`
  font-weight: 600;
  margin-top: 10px;
  color: #fa8758;
  margin-bottom: 5px;
`;

export const ItemCalories = styled.div`
  color: #aaa;
`;

export const ItemPrice = styled.div`
  font-weight: 600;
  color: #fa8758;
`;

export const ItemSecondaryInfo = styled.div`
  padding: 0 32px 32px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
