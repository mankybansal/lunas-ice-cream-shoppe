import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  overflow-y: auto;
  padding: 24px;
`;

export const ItemContainer = styled.div<{ selected?: boolean }>`
  width: 300px;
  height: 260px;
  display: flex;
  background: white;
  border-radius: 5px;
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
      border: 3px solid rgba(100, 149, 237, 1) !important;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
      background: white !important;
    `}

  :hover {
    background: #fafafa;
    border: 3px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.02);
  }
`;

export const ItemPrimaryInfo = styled.div`
  padding: 32px 32px 0px 32px;
  width: 100%;
  flex-direction: column;
  display: flex;
  flex: 1;
`;

export const ItemTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
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
  color: cornflowerblue;
  margin-bottom: 5px;
`;

export const ItemCalories = styled.div`
  color: #aaa;
`;

export const ItemPrice = styled.div`
  font-weight: 600;
  color: cornflowerblue;
`;

export const ItemSecondaryInfo = styled.div`
  padding: 0 32px 32px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
