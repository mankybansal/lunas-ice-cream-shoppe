import * as AppConfig from "../config";

const strings = {
  appLogo: "Luna's Ice Cream",
  cancelOrder: "Cancel Order",
  help: "Help"
};

interface HeaderProps {
  prompt: string;
  stepHandler: (step: number) => void;
}

const Header = ({ prompt, stepHandler }: HeaderProps) => (
  <div className="App-header">
    <div className={"App-header-inner"}>
      <div className="App-logo">{strings.appLogo}</div>
      <div className="App-prompt">{prompt}</div>
      <div style={{ display: "flex", gap: "16px" }}>
        <div
          className="Button-cancel"
          onClick={() => stepHandler(AppConfig.steps.Start)}
        >
          {strings.cancelOrder}
        </div>
        <div className="Button-help">{strings.help}</div>
      </div>
    </div>
  </div>
);

export default Header;
