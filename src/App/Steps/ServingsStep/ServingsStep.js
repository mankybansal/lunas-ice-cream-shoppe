import React from 'react';
import * as AppConfig from "../../AppConfig";

class ServingsList extends React.Component {

    constructor(props) {
        super(props);
        this.boundItemClick = this.onItemClick.bind(this);
    }

    onItemClick(item) {
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
                    <div key={Serving.id.toString()} className={defaultClass} onClick={() => this.boundItemClick(Serving)}>
                        <b>{Serving.name}</b>
                        <br/><br/>
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
                <p>What would you like? (Cone/Bowl)</p>
                <ServingsList Servings={this.props.Servings} orderHandler={this.props.orderHandler} Order={this.props.Order}/>
                <button onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>Next: Choose Flavors</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>
            </div>
        );
    }
}

export default ServingsStep;