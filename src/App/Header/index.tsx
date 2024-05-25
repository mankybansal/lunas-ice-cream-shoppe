import * as AppConfig from "../config";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";

const strings = {
  appLogo: "Luna's Ice Cream",
  cancelOrder: "Cancel Order",
  help: "Help"
};

interface HeaderProps {
  prompt: string;
}

const Header = ({ prompt }: HeaderProps) => {
  const { stepHandler } = useStepHandler();
  return (
    <div className="App-header">
      <div className={"App-header-inner"}>
        <div className="App-logo">{strings.appLogo}</div>
        <div className="App-prompt">{prompt}</div>
        <div style={{ display: "flex", gap: "16px" }}>
          <div
            className="Button-cancel"
            onClick={() => stepHandler(AppConfig.Steps.Start)}
          >
            {strings.cancelOrder}
          </div>
          <div className="Button-help">{strings.help}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
