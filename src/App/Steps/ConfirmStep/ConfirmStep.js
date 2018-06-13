import React from 'react';
import * as AppConfig from "../../AppConfig";

class ConfirmStep extends React.Component {

    constructor(props) {
        super(props);

        this.stepHandler = this.stepHandler.bind(this);
    }

    componentWillReceiveProps(){
        this.setState({
            order: this.props.order
        });
    }

    stepHandler(gotoStep) {
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Confirm) {
            return null;
        }

        return (
            <div>
                <p>Review Order</p>

                <div>Order Number { this.state.order.Number.toString() }</div>
                <div><b>{ this.state.order.Serving.name }</b></div>

                <button onClick={() => this.stepHandler(AppConfig.steps.Servings)}>Add Another Order</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Payment)}>Next: Payment</button>

                <br/>
                <br/>
                <br/>


                <button onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>
            </div>
        );
    }
}

export default ConfirmStep;