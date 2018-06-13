import React from 'react';
import * as AppConfig from "../../AppConfig";

class StartStep extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            CurrentOrder: null,
        };

        this.stepHandler = this.stepHandler.bind(this);
    }

    componentWillMount() {
        this.setState({
            CurrentOrder: this.props.currentOrder,
        });
    }

    stepHandler(gotoStep) {

        let currentOrder = this.state.CurrentOrder;
        currentOrder.Number = Math.floor(Math.random() * 1000) + 1;

        this.setState({
           CurrentOrder: currentOrder
        });

        this.props.orderHandler(this.state.CurrentOrder);
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