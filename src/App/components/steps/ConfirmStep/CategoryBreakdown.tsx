import styled from "@emotion/styled";
import { MediaQuery } from "~/App/mediaQuery.ts";

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5px;
  justify-content: space-between;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    font-size: 14px;
  }
`;

const Price = styled.div`
  color: #aaa;
`;

interface Props {
  items: {
    name: string;
    price: number;
  }[];
}

export const CategoryBreakDown = ({ items }: Props) => (
  <>
    {items.map(({ name, price }, i) => (
      <RootContainer key={i}>
        <span>{name}</span>
        <Price>${price.toFixed(2)}</Price>
      </RootContainer>
    ))}
  </>
);
