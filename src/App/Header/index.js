import * as AppConfig from "../AppConfig";
import React from "react";

class Header extends React.Component {
    render() {
        return (
            <div className="App-header">
                <div className="App-logo">Luna's Ice Cream</div>
                <div className="App-prompt">{this.props.prompt}</div>
                <div className="Button-cancel" onClick={() => this.props.stepHandler(AppConfig.steps.Start)}>Cancel Order</div>
                <div className="Button-help">Help</div>
            </div>
        );
    }
}

export default Header;