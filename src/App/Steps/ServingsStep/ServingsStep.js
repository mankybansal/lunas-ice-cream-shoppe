import React from 'react';
import * as AppConfig from "../../AppConfig";

class ServingsList extends React.Component {

    constructor(props) {
        super(props);
        this.selectServing = this.selectServing.bind(this);
    }

    selectServing(item) {
        let Order = this.props.Order;

        Order.CurrentItem.Serving = item;
        Order.CurrentItem.Flavors = Order.CurrentItem.Flavors.slice(0, Order.CurrentItem.Serving.scoops);
        Order.CurrentItem.Toppings = Order.CurrentItem.Toppings.slice(0, Order.CurrentItem.Serving.toppings);

        this.props.orderHandler(Order);
    }

    render() {
        const listItems = this.props.Servings.map((Serving) => {

                let defaultClass = "servingContainer";
                if (this.props.Order.CurrentItem.Serving && this.props.Order.CurrentItem.Serving.id === Serving.id)
                    defaultClass += " selected";

                return (
                    <div key={Serving.id.toString()} className={defaultClass} onClick={() => this.selectServing(Serving)}>
                        <h2>{Serving.name}</h2>
                        <div>{Serving.desc}</div>
                    </div>
                )
            }
        );

        return (<div>{listItems}</div>);
    }
}

class ServingsStep extends React.Component {

    constructor(props) {
        super(props);
        this.stepHandler = this.stepHandler.bind(this);
    }

    stepHandler(gotoStep) {
        if(gotoStep === AppConfig.steps.Start){
            this.props.stepHandler(gotoStep);
            return;
        }

        if (this.props.Order.CurrentItem.Serving) {
            this.props.orderHandler(this.props.Order);
            this.props.stepHandler(gotoStep);
        } else
            alert("Please select a serving size");
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Servings)
            return null;

        return (
            <div>
                <div className="prompt">What would you like?</div>
                <ServingsList Servings={this.props.Servings} orderHandler={this.props.orderHandler} Order={this.props.Order}/>
                <button className="buttonNext" onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>
                    <div className="buttonLabel">Next</div>
                    <hr/>
                    Select Flavors
                </button>

                <br/>
                <br/>
                <br/>

                <button className="buttonCancel" onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>
            </div>
        );
    }
}

export default ServingsStep;