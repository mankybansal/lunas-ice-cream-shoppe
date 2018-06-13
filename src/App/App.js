import React, {Component} from 'react';
import './App.css';
import {StartStep, ServingsStep, FlavorsStep, ToppingsStep, ConfirmStep, PaymentStep, FinishStep} from './Steps';
import * as AppConfig from "./AppConfig";
import REQUESTS from '../api';

// Sample Card Details
/*
let cardDetails = {
    name: "Mayank Bansal",
    network: "Visa",
    type: "Credit",
    number: 519600000001122333344,
    expiry: "02/19/2022",
    cvv: 999
};
*/


class IceCreamKiosk extends Component {

    constructor(props) {
        super(props);

        // Set Application State
        this.state = AppConfig.defaultState();

        // this.ConfirmOrder({name: "hello"},cardDetails);
        this.stepHandler = this.stepHandler.bind(this);
        this.orderHandler = this.orderHandler.bind(this);
    }

    async componentWillMount() {
        // Request API for Menu
        REQUESTS.GetMenu((GetMenuResponse) => {
            if (GetMenuResponse.Success) {
                this.setState({
                    Menu: {
                        Servings: GetMenuResponse.Servings,
                        Flavors: GetMenuResponse.Flavors,
                        Toppings: GetMenuResponse.Toppings,
                    }
                }, () => {
                    console.log("Servings Available:", this.state.Menu.Servings);
                    console.log("Flavors Available:", this.state.Menu.Flavors);
                    console.log("Toppings Available:", this.state.Menu.Toppings);
                });

            }
        });
    }

    stepHandler(gotoStep) {

        if (gotoStep === AppConfig.steps.Start)
            this.setState(AppConfig.resetOrder());
        else
            this.setState({
                currentStep: gotoStep
            });
    }

    orderHandler(Order) {
        this.setState({
            Order: Order
        });
    }

    ConfirmOrder(order, cardDetails) {
        // calculate amount, complete payment and sendOrder
        let amount = 999;

        // send payment info to API
        REQUESTS.SendPayment(amount, cardDetails,
            (PaymentResponse) => {
                if (PaymentResponse.Success) {
                    console.log("Payment Processed");

                    // send order to API
                    REQUESTS.SendOrder(order,
                        (SendOrderResponse) => {
                            if (SendOrderResponse.Success) {
                                console.log("Order #" + SendOrderResponse.Order.number + " Processed");
                            }
                        })
                }
            });
    }

    render() {

        let currentStep = this.state.currentStep;
        let servings = this.state.Menu.Servings;
        let flavors = this.state.Menu.Flavors;
        let toppings = this.state.Menu.Toppings;

        return (
            <div className="App">

                <StartStep
                    stepHandler={this.stepHandler}
                    currentStep={currentStep}
                />

                <ServingsStep
                    stepHandler={this.stepHandler}
                    orderHandler={this.orderHandler}
                    currentStep={currentStep}
                    Servings={servings}
                    Order={this.state.Order}
                />

                <FlavorsStep
                    stepHandler={this.stepHandler}
                    orderHandler={this.orderHandler}
                    currentStep={currentStep}
                    Flavors={flavors}
                    Order={this.state.Order}
                />

                <ToppingsStep
                    stepHandler={this.stepHandler}
                    orderHandler={this.orderHandler}
                    currentStep={currentStep}
                    Toppings={toppings}
                    Order={this.state.Order}
                />

                <ConfirmStep
                    stepHandler={this.stepHandler}
                    orderHandler={this.orderHandler}
                    Order={this.state.Order}
                    currentStep={currentStep}
                />

                <PaymentStep
                    stepHandler={this.stepHandler}
                    currentStep={currentStep}
                />

                <FinishStep
                    stepHandler={this.stepHandler}
                    currentStep={currentStep}
                />

            </div>
        );
    }
}

export default IceCreamKiosk;
