import React from 'react';
import * as AppConfig from "../../AppConfig";

class ToppingsStep extends React.Component {

    render() {
        if (this.props.currentStep !== AppConfig.steps.Toppings) {
            return null;
        }

        return (
            <p>Select [number] Toppings</p>
        );
    }
}

export default ToppingsStep;