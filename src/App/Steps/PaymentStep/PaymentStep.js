import React from 'react';
import * as AppConfig from "../../AppConfig";

class PaymentStep extends React.Component {
    constructor(props) {
        super(props);
        this.stepHandler = this.stepHandler.bind(this);
    }

    stepHandler() {
        this.props.paymentHandler();
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Payment)
            return null;

        return (
            <div>
                <p>Make Payment</p>
                <h2>Total Amount Due: ${this.props.TotalPrice.toFixed(2)}</h2>
                <br/><br/>
                <h3> Insert Card to Complete Payment </h3>
                <button onClick={this.stepHandler}>Complete Payment</button>
            </div>
        );
    }
}

export default PaymentStep;