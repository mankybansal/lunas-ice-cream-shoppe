import React from 'react';
import * as AppConfig from "../../AppConfig";

class FlavorsStep extends React.Component {

    render() {
        if (this.props.currentStep !== AppConfig.steps.Flavors) {
            return null;
        }

        return (
            <p>Select [number] Flavors</p>
        );
    }
}

export default FlavorsStep;