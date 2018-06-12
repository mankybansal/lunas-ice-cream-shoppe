import React from 'react';
import * as AppConfig from "../../AppConfig";

class StartStep extends React.Component {

    constructor(props) {
        super(props);

        this.stepHandler = this.stepHandler.bind(this);
    }

    stepHandler(gotoStep) {
        this.props.stepHandler(gotoStep);
        this.props.orderHandler(333, false, false, false)
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Start) {
            return null;
        }

        return (
            <div>
                <p>Touch to Start</p>
                <button onClick={() => this.stepHandler(AppConfig.steps.Servings)}>Touch To Begin</button>
            </div>
        );
    }
}

export default StartStep;