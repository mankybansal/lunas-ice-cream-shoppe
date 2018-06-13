import React, {Component} from 'react';
import './App.css';
import {StartStep, ServingsStep, FlavorsStep, ToppingsStep, ConfirmStep, PaymentStep, FinishStep} from './Steps';
import * as AppConfig from "./AppConfig";
import REQUESTS from '../api';
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
                this.setState({
                    Menu: {
                        Servings: GetMenuResponse.Servings,
                        Flavors: GetMenuResponse.Flavors,
                        Toppings: GetMenuResponse.Toppings,
                    },
                    currentStep: AppConfig.steps.Start
                }, Helpers.menuPrinter(GetMenuResponse));

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
        REQUESTS.SendPayment(this.state.TotalPrice, AppConfig.CardDetails, (PaymentResponse) => {
            if (PaymentResponse.Success) {
                Helpers.paymentPrinter(PaymentResponse);

                // send order to API
                REQUESTS.SendOrder(this.state.Order, PaymentResponse.Payment, (SendOrderResponse) => {
                    if (SendOrderResponse.Success) {
                        this.setState({
                            Order: SendOrderResponse.Order,
                            currentStep: AppConfig.steps.Finish
                        });
                        Helpers.orderPrinter(SendOrderResponse);
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
                    TotalPrice={this.state.TotalPrice}
                />

                <FinishStep
                    stepHandler={this.stepHandler}
                    currentStep={currentStep}
                    Order={this.state.Order}
                />

            </div>
        );
    }
}

export default IceCreamKiosk;
