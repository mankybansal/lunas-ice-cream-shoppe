import React from 'react';
import * as AppConfig from "../../AppConfig";

class PaymentStep extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            TotalPrice: 0
        };

        this.stepHandler = this.stepHandler.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            TotalPrice: props.Price
        });
    }

    stepHandler(gotoStep) {
        this.props.paymentHandler(this.state.TotalPrice);
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Payment)
            return null;

        return (
            <div>
                <p>Pay Please</p>
                <h2>Total Amount Due: ${this.state.TotalPrice.toFixed(2)}</h2>
                <br/><br/>
                <h3> Insert Card to Complete Payment </h3>
                <button onClick={() => this.stepHandler(AppConfig.steps.Finish)}>Complete Payment</button>
            </div>
        );
    }
}

export default PaymentStep;