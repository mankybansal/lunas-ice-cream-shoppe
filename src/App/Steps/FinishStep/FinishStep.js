import React from "react";
import * as AppConfig from "../../AppConfig";

class FinishStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 20,
      rendered: false
    };
  }

  decrementCounter() {
    let intervalFn = setInterval(
      function () {
        if (this.state.timer <= 0) {
          this.props.stepHandler(AppConfig.steps.Start);
          clearInterval(intervalFn);
          this.setState({
            timer: 20,
            rendered: false
          });
        }

        this.setState({
          timer: this.state.timer - 1
        });
      }.bind(this),
      1000
    );
  }

  render() {
    if (this.props.currentStep !== AppConfig.steps.Finish) return null;
    else {
      if (!this.state.rendered) {
        this.setState({ rendered: true });
        this.decrementCounter();
      }
    }

    return (
      <div>
        <div className="App-prompt">Thank You For Your Order</div>

        <div className="Payment-amount Order-number">
          Order #{this.props.Order.Number}
        </div>

        <div className="Payment-amount-small">
          Placed at {this.props.Order.Time.toLocaleTimeString()} on{" "}
          {this.props.Order.Time.toLocaleDateString()}
        </div>

        <div className="Payment-amount-small">
          ${this.props.Order.Payment.Amount.toFixed(2)} paid by{" "}
          {this.props.Order.Payment.network +
            " " +
            this.props.Order.Payment.type}{" "}
          ending with {this.props.Order.Payment.number.slice(12, 16)}
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="cardSwipePrompt">
          This page will refresh in {this.state.timer} seconds
        </div>
      </div>
    );
  }
}

export default FinishStep;
