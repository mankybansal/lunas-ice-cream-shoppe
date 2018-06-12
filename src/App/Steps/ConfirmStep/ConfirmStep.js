import React from 'react';
import * as AppConfig from "../../AppConfig";

class ConfirmStep extends React.Component {

    render() {
        if (this.props.currentStep !== AppConfig.steps.Confirm) {
            return null;
        }

        return (
            <p>Review Order</p>
        );
    }
}

export default ConfirmStep;