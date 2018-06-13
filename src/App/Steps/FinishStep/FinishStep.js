import React from 'react';
import * as AppConfig from "../../AppConfig";

class FinishStep extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: 10,
            rendered: false
        };
    }

    decrementCounter() {
       let intervalFn = setInterval(function () {

            if(this.state.timer <= 0) {
                this.props.stepHandler(AppConfig.steps.Start);
                clearInterval(intervalFn);
                this.setState({
                    timer: 10,
                    rendered: false
                });
            }

            this.setState({
                timer: this.state.timer - 1
            });
        }.bind(this), 1000);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Finish)
            return null;
        else {
            if (!this.state.rendered) {
                this.setState({rendered: true});
                this.decrementCounter()
            }
        }

        return (
            <div>
                <p>Thank You For Your Order</p>

                ${this.props.Order.Payment.Amount.toFixed(2)} payed
                by {this.props.Order.Payment.network + " " + this.props.Order.Payment.type} ending
                with {this.props.Order.Payment.number.slice(12, 16)}
                <br/>
                <br/>
                Successfully Processed Order #{this.props.Order.Number}
                <br/>
                <br/>
                Placed at {this.props.Order.Time.toLocaleTimeString()} on {this.props.Order.Time.toLocaleDateString()}
                <br/>
                <br/>
                Page will refresh in <b>{this.state.timer}</b> seconds
            </div>
        );
    }
}

export default FinishStep;