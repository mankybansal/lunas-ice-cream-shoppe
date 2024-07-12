import styled from "@emotion/styled";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import { TouchToBegin } from "./TouchToBegin";

const strings = {
  title: "Welcome to Luna's Ice Cream Shoppe",
  subtitle:
    "We have been crafting the most hip, award winning, delicious ice cream the world has ever seen for over 30 years.",
  touchToBegin: "Touch To Begin"
};

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 200px;
  justify-content: center;
  height: 100%;
  align-items: center;
`;

const AppTitle = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 150px;
  font-size: 44px;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
`;

const AppSubtitle = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 100px;
  font-size: 24px;
  line-height: 32px;
  color: #9c8b73;
  max-width: 800px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const MadeIn = styled.div`
  font-size: 24px;
  color: #ffa07a;
  min-width: 400px;
  margin-top: 16px;
  font-family: Pacifico, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

  ::before,
  ::after {
    content: "";
    flex-grow: 1;
    height: 2px;
    margin-top: 4px;
    background: #ffa07a;
  }

  ::before {
    margin-right: 10px;
  }

  ::after {
    margin-left: 10px;
  }
`;

const StartStep = () => {
  const { createNewItem } = useStepHandler();
  return (
    <RootContainer>
      <AppTitle>{strings.title}</AppTitle>
      <MadeIn>Seattle, Washington</MadeIn>
      <AppSubtitle>{strings.subtitle}</AppSubtitle>
      <TouchToBegin onClick={createNewItem} label={strings.touchToBegin} />
    </RootContainer>
  );
};

export default StartStep;
