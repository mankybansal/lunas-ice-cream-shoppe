import React from 'react';
import * as AppConfig from "../../AppConfig";

class ConfirmStep extends React.Component {

    constructor(props) {
        super(props);

        this.stepHandler = this.stepHandler.bind(this);
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