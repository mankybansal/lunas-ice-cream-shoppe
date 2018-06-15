import React from 'react';
import * as AppConfig from "../../AppConfig";
import Header from "../../Header";

class PaymentStep extends React.Component {
    constructor(props) {
        super(props);
        this.stepHandler = this.stepHandler.bind(this);
    }

    stepHandler(gotoStep) {
        if (gotoStep < this.props.currentStep)
            this.props.stepHandler(gotoStep);
        else
            this.props.paymentHandler();
    }
    render() {
        if (this.props.currentStep !== AppConfig.steps.Payment)
            return null;

        alert("Click on animation to simulate payment");

        let prompt = "Make Payment";

        return (
            <div className="App-header-padder">
                <Header prompt={prompt} stepHandler={this.stepHandler}/>

                <div className="Payment-amount">Your Card Will Be Charged: ${this.props.TotalPrice.toFixed(2)}</div>

                <div className="paymentInteraction" onClick={this.stepHandler}>
                    <div className="paymentDevice"/>
                    <div className="paymentCard"/>
                </div>

                <div className="cardSwipePrompt"> Swipe Card To Complete Payment</div>
            </div>
        );
    }
}

export default PaymentStep;