import * as AppConfig from "../../config";
import styled from "@emotion/styled";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";

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

const StartStep = () => {
  const { stepHandler } = useStepHandler();
  return (
    <RootContainer>
      <div className="App-title">{strings.title}</div>
      <div className="App-subtitle">{strings.subtitle}</div>

      <div
        onClick={() => stepHandler(AppConfig.Steps.Servings)}
        className="circleClickerContainer"
      >
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
