import * as AppConfig from "../../config";
import styled from "@emotion/styled";
import { useStepHandler } from "~/App/hooks/useStepHandler";

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
  justify-content: center;
  height: 100%;
  align-items: center;
`;

const AppTitle = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 150px;
  font-size: 48px;
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
  color: #aaa;
  max-width: 800px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const StartStep = () => {
  const { stepHandler } = useStepHandler();
  const handleClickStart = () => stepHandler(AppConfig.Steps.Servings);
  return (
    <RootContainer>
      <AppTitle>{strings.title}</AppTitle>
      <AppSubtitle>{strings.subtitle}</AppSubtitle>
      <div onClick={handleClickStart} className="circleClickerContainer">
        <div className="circleClicker">
          <div className="circleClickerPersistent">
            <div className="circleClickerPersistent2" />
          </div>
        </div>
        <div className="circleClickerPrompt">{strings.touchToBegin}</div>
      </div>
    </RootContainer>
  );
};

export default StartStep;
