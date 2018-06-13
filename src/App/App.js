import React, {Component} from 'react';
import './App.css';
import {StartStep, ServingsStep, FlavorsStep, ToppingsStep, ConfirmStep, PaymentStep, FinishStep} from './Steps';
import * as AppConfig from "./AppConfig";
import REQUESTS from '../api';
import * as Helpers from "./Helpers";

// Sample Card Details
let cardDetails = {
    name: "Mayank Bansal",
    network: "Visa",
    type: "Credit",
    number: 519600000001122333344,
    expiry: "02/19/2022",
    cvv: 999
};


class IceCreamKiosk extends Component {

    constructor(props) {
        super(props);

        // Set Application State
        this.state = AppConfig.defaultState();

        // this.ConfirmOrder({name: "hello"},cardDetails);
        this.stepHandler = this.stepHandler.bind(this);
        this.orderHandler = this.orderHandler.bind(this);
        this.priceHandler = this.priceHandler.bind(this);
        this.paymentHandler = this.paymentHandler.bind(this);
    }

    componentWillMount() {
        // Request API for Menu
       this.getMenu();
    }

    async getMenu(){
        REQUESTS.GetMenu((GetMenuResponse) => {
            if (GetMenuResponse.Success) {
                this.setState({
                    Menu: {
                        Servings: GetMenuResponse.Servings,
                        Flavors: GetMenuResponse.Flavors,
                        Toppings: GetMenuResponse.Toppings,
                    }
                }, () => {
                    console.log("Servings Available:", this.state.Menu.Servings.length);
                    console.log("Flavors Available:", this.state.Menu.Flavors.length);
                    console.log("Toppings Available:", this.state.Menu.Toppings.length);
                });

            }
        });
    }

    /*****************
     * APP HANDLERS
     *****************/

    stepHandler(gotoStep) {
        if (gotoStep === AppConfig.steps.Start) {
            this.setState(AppConfig.defaultState());
            this.getMenu();
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
        // send payment info to API
        REQUESTS.SendPayment(this.state.TotalPrice, cardDetails,
            (PaymentResponse) => {
                if (PaymentResponse.Success) {
                    console.log("Payment Processed");

                    // send order to API
                    REQUESTS.SendOrder(this.state.Order,
                        (SendOrderResponse) => {
                            if (SendOrderResponse.Success) {
                                console.log("Successfully Processed Order #" + SendOrderResponse.Order.Number);
                                console.log("Placed at " + SendOrderResponse.Order.Time.toLocaleTimeString() + " on " + SendOrderResponse.Order.Time.toLocaleDateString());
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
                    priceHandler={this.priceHandler}

                />

                <ConfirmStep
                    stepHandler={this.stepHandler}
                    orderHandler={this.orderHandler}
                    Order={this.state.Order}
                    currentStep={currentStep}
                    TotalPrice={this.state.TotalPrice}
                />

                <PaymentStep
                    stepHandler={this.stepHandler}
                    paymentHandler={this.paymentHandler}
                    currentStep={currentStep}
                    Order={this.state.Order}
                    Price={this.state.TotalPrice}
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
