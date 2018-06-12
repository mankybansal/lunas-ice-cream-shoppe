import React from 'react';
import * as AppConfig from "../../AppConfig";

class FinishStep extends React.Component {

    render() {
        if (this.props.currentStep !== AppConfig.steps.Finish) {
            return null;
        }

        return (
            <p>Thank You</p>
        );
    }
}

export default FinishStep;