import React from 'react';
import * as AppConfig from "../../AppConfig";

class ServingsStep extends React.Component {

    render() {
        if (this.props.currentStep !== AppConfig.steps.Servings) {
            return null;
        }

        return (
            <p>What would you like? (Cone/Bowl)</p>
        );
    }
}

export default ServingsStep;