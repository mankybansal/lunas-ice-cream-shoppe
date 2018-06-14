import * as AppConfig from "../AppConfig";
import React from "react";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="logo">Luna's Ice Cream</div>
                <div className="prompt">{this.props.prompt}</div>
                <div className="buttonCancel" onClick={() => this.props.stepHandler(AppConfig.steps.Start)}>Cancel Order</div>
                <div className="buttonHelp">Help</div>
            </div>
        );
    }
}

export default Header;