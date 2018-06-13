import React from 'react';
import * as AppConfig from "../../AppConfig";

class StartStep extends React.Component {

    constructor(props) {
        super(props);
        this.stepHandler = this.stepHandler.bind(this);
    }

    componentWillMount() {
        this.setState({
            Order: this.props.Order,
        });
    }

    stepHandler(gotoStep) {
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Start) {
            return null;
        }

        return (
            <div>
                <h1> Welcome To Luna's Ice Cream Shoppe</h1>
                <br/>
                <button onClick={() => this.stepHandler(AppConfig.steps.Servings)}>Touch To Begin</button>
            </div>
        );
    }
}

export default StartStep;