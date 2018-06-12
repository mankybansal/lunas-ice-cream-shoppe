import React, {Component} from 'react';
import './App.css';
import {StartStep, ServingsStep, FlavorsStep, ToppingsStep, ConfirmStep, PaymentStep, FinishStep} from './Steps';
import * as AppConfig from "./AppConfig";
import * as API from '../api';

class IceCreamKiosk extends Component {

    constructor(props) {
        super(props);

        // Print API Data
        console.log("API Data Dump:");
        API.PrintData();

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
