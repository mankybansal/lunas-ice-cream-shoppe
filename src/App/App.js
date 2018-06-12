import React, {Component} from 'react';
import './App.css';
import {StartStep, ServingsStep, FlavorsStep, ToppingsStep, ConfirmStep, PaymentStep, FinishStep} from './Steps';
import * as AppConfig from "./AppConfig";
import REQUESTS from '../api';

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

        // GET MENU
        console.log("API Data Dump:");
        REQUESTS.GetMenu(function(GetMenuResponse){
            if(GetMenuResponse.Success){
                console.log(GetMenuResponse.Servings);
                console.log(GetMenuResponse.Flavors);
                console.log(GetMenuResponse.Toppings);
            }
        });

        this.ConfirmOrder({name: "hello"},cardDetails);

        this.state = {
            currentStep: AppConfig.steps.Start
        };

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    next() {
        let currentStep = this.state.currentStep;
        if (currentStep < AppConfig.steps.Finish)
            currentStep++;

        this.setState({
            currentStep: currentStep
        });
    }

    prev() {
        let currentStep = this.state.currentStep;

        if (currentStep > AppConfig.steps.Start)
            currentStep--;

        this.setState({
            currentStep: currentStep
        });
    }

    ConfirmOrder(order, cardDetails) {
        // calculate amount, complete payment and sendOrder
        let amount = 999;

        // send payment info to API
        REQUESTS.SendPayment(amount, cardDetails, function (PaymentResponse) {
            if (PaymentResponse.Success) {
                console.log("Payment Processed");

                // send order to API
                REQUESTS.SendOrder(order, function (SendOrderResponse) {
                    if (SendOrderResponse.Success) {
                        console.log("Order #" + SendOrderResponse.Order.number + " Processed");
                    }
                })
            }
        });
    }

    render() {
        let currentStep = this.state.currentStep;
        return (
            <div className="App">
                <StartStep currentStep={currentStep}/>
                <ServingsStep currentStep={currentStep}/>
                <FlavorsStep currentStep={currentStep}/>
                <ToppingsStep currentStep={currentStep}/>
                <ConfirmStep currentStep={currentStep}/>
                <PaymentStep currentStep={currentStep}/>
                <FinishStep currentStep={currentStep}/>

                <button onClick={this.prev}>Prev</button>
                <button onClick={this.next}>Next</button>
            </div>
        );
    }
}

export default IceCreamKiosk;
