import React from 'react';
import * as AppConfig from "../../AppConfig";

class StartStep extends React.Component {

    render() {
        if (this.props.currentStep !== AppConfig.steps.Start) {
            return null;
        }

        return (
            <p>Touch to Start</p>
        );
    }
}

export default StartStep;