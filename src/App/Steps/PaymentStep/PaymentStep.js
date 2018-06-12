import React from 'react';
import * as AppConfig from "../../AppConfig";

class PaymentStep extends React.Component {

    render() {
        if (this.props.currentStep !== AppConfig.steps.Payment) {
            return null;
        }

        return (
            <p>Pay Please</p>
        );
    }
}

export default PaymentStep;