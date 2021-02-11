import React, { Component } from "react";

import "./App.css";
import "./Styles/Containers.css";
import "./Styles/Interactions.css";
import "./Styles/Buttons.css";
import "./Styles/Icons.css";

import {
  StartStep,
  ServingsStep,
  FlavorsStep,
  ToppingsStep,
  ConfirmStep,
  PaymentStep,
  FinishStep
} from "./Steps";
import * as AppConfig from "./AppConfig";
import REQUESTS from "../api";
import * as Helpers from "./Helpers";

class IceCreamKiosk extends Component {
  constructor(props) {
    super(props);

    // Set Application State
    this.state = AppConfig.defaultState();

    // Setup Handlers
    this.stepHandler = this.stepHandler.bind(this);
    this.orderHandler = this.orderHandler.bind(this);
    this.priceHandler = this.priceHandler.bind(this);
    this.paymentHandler = this.paymentHandler.bind(this);
  }

  componentWillMount() {
    // Request API for Menu
    this.appInit();
  }

  async appInit() {
    Helpers.appInitPrinter();

    REQUESTS.GetMenu((GetMenuResponse) => {
      if (GetMenuResponse.Success) {
        this.setState(
          {
            Menu: {
              Servings: GetMenuResponse.Servings,
              Flavors: GetMenuResponse.Flavors,
              Toppings: GetMenuResponse.Toppings
            },
            currentStep: AppConfig.steps.Start
          },
          Helpers.menuPrinter(GetMenuResponse)
        );
      }
    });
  }

  /*****************
   * APP HANDLERS
   *****************/

  stepHandler(gotoStep) {
    if (gotoStep === AppConfig.steps.Start) {
      this.setState(AppConfig.defaultState());
      this.appInit();
    }

    this.setState({
      currentStep: gotoStep
    });
  }

  orderHandler(Order) {
    this.setState({
      Order: Order
    });
  }

  priceHandler() {
    this.setState({
      TotalPrice: Helpers.calculatePrice(this.state.Order)
    });
  }

  paymentHandler() {
    console.log("\nProcessing Payment...\n");
    REQUESTS.SendPayment(
      this.state.TotalPrice,
      AppConfig.CardDetails,
      (PaymentResponse) => {
        if (PaymentResponse.Success) {
          Helpers.paymentPrinter(PaymentResponse);

          // send order to API
          REQUESTS.SendOrder(
            this.state.Order,
            PaymentResponse.Payment,
            (SendOrderResponse) => {
              if (SendOrderResponse.Success) {
                this.setState({
                  Order: SendOrderResponse.Order,
                  currentStep: AppConfig.steps.Finish
                });
                Helpers.orderPrinter(SendOrderResponse);
              }
            }
          );
        }
      }
    );
  }

  render() {
    return (
      <div className="App">
        <StartStep
          stepHandler={this.stepHandler}
          currentStep={this.state.currentStep}
        />

        <ServingsStep
          stepHandler={this.stepHandler}
          orderHandler={this.orderHandler}
          currentStep={this.state.currentStep}
          Servings={this.state.Menu.Servings}
          Order={this.state.Order}
        />

        <FlavorsStep
          stepHandler={this.stepHandler}
          orderHandler={this.orderHandler}
          currentStep={this.state.currentStep}
          Flavors={this.state.Menu.Flavors}
          Order={this.state.Order}
        />

        <ToppingsStep
          stepHandler={this.stepHandler}
          orderHandler={this.orderHandler}
          priceHandler={this.priceHandler}
          currentStep={this.state.currentStep}
          Toppings={this.state.Menu.Toppings}
          Order={this.state.Order}
        />

        <ConfirmStep
          stepHandler={this.stepHandler}
          orderHandler={this.orderHandler}
          priceHandler={this.priceHandler}
          Order={this.state.Order}
          currentStep={this.state.currentStep}
          TotalPrice={this.state.TotalPrice}
        />

        <PaymentStep
          stepHandler={this.stepHandler}
          paymentHandler={this.paymentHandler}
          currentStep={this.state.currentStep}
          Order={this.state.Order}
          TotalPrice={this.state.TotalPrice}
        />

        <FinishStep
          stepHandler={this.stepHandler}
          currentStep={this.state.currentStep}
          Order={this.state.Order}
        />
      </div>
    );
  }
}

export default IceCreamKiosk;
